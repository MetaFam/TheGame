import {
  Constants,
  fetch,
  getLatestEthAddress,
  getNumWeeksInSeason,
  isNotNullOrUndefined,
} from '@metafam/utils';
import bluebird from 'bluebird';
import { Request, Response } from 'express';
import { SCAccountsData, SCAlias, sourcecred as sc } from 'sourcecred';

import {
  AccountType_Enum,
  Player_Account_Constraint,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';
import { computeRank } from '../../../lib/rankHelpers';
import { ledgerManager } from '../../../lib/sourcecredLedger';

const VALID_ACCOUNT_TYPES: Array<AccountType_Enum> = [
  AccountType_Enum.Ethereum,
  AccountType_Enum.Discord,
  AccountType_Enum.Discourse,
  AccountType_Enum.Github,
  AccountType_Enum.Twitter,
];

const parseAlias = (alias: SCAlias) => {
  try {
    const addressParts = sc.core.graph.NodeAddress.toParts(alias.address);
    const type = addressParts[1]?.toUpperCase() as AccountType_Enum;

    if (!VALID_ACCOUNT_TYPES.includes(type)) {
      return null;
    }

    const identifier = addressParts[addressParts.length - 1];

    return {
      type,
      identifier,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse alias:', {
      error: (e as Error).message,
      alias,
    });
    return null;
  }
};

export const migrateSourceCredAccounts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error: loadError } = await ledgerManager.reloadLedger();
  if (loadError) {
    throw new Error(`Unable to load ledger: ${loadError}`);
  }

  const force = req.query.force != null;
  console.debug(`Updating players from sourcecred. Force-insert? ${force}`);

  const accountsResult = await fetch(Constants.SC_ACCOUNTS_FILE);
  const accountsData = (await accountsResult.json()) as SCAccountsData;
  const accountOnConflict = {
    constraint: Player_Account_Constraint.AccountIdentifierTypeKey,
    update_columns: [],
  };

  const numWeeksInSeason = getNumWeeksInSeason();

  const accountList = accountsData.accounts
    .filter((a) => a.account.identity.subtype === 'USER')
    .sort((a, b) => b.totalCred - a.totalCred)
    .map((a, index) => {
      const linkedAccounts = a.account.identity.aliases
        .map((alias) => parseAlias(alias))
        .filter(isNotNullOrUndefined);

      const discordId = linkedAccounts.find(
        ({ type }) => type === 'DISCORD',
      )?.identifier;

      const ethAddress = getLatestEthAddress(a.account.identity);

      if (!ethAddress) return null;

      const rank = computeRank(index);
      const userWeeklyCred = a.cred;
      const seasonXP = userWeeklyCred
        .slice(-numWeeksInSeason)
        .reduce((t, c) => t + c, 0);
      return {
        ethereumAddress: ethAddress.toLowerCase(),
        totalXP: a.totalCred,
        seasonXP,
        rank,
        discordId,
        Accounts: {
          // Omit the discord account, as that is updated directly on the player table
          data: linkedAccounts.filter(
            ({ type }) => type !== AccountType_Enum.Discord,
          ),
          on_conflict: accountOnConflict,
        },
      };
    })
    .filter(isNotNullOrUndefined);

  try {
    const result = await bluebird.map(
      accountList,
      async (player) => {
        const vars = {
          ethAddress: player.ethereumAddress,
          rank: player.rank,
          totalXP: player.totalXP,
          seasonXP: player.seasonXP,
          discordId: player.discordId,
        };

        try {
          const { update_player: update } = await client.UpdatePlayer(vars);

          let playerId: string = update?.returning[0]?.id;
          let { affected_rows: affected } = update ?? {};

          if ((affected ?? 0) > 1) {
            throw new Error(
              `Multiple players (${affected}) updated incorrectly: ${player.ethereumAddress}`,
            );
          } else if (affected === 0) {
            if (!force) {
              return player;
            }

            // 'force' indicates we should insert new players
            // if they don't already exist.
            const { insert_player: insert } = await client.InsertPlayers({
              objects: [
                {
                  ethereumAddress: player.ethereumAddress,
                  rank: player.rank,
                  totalXP: player.totalXP,
                  seasonXP: player.seasonXP,
                },
              ],
            });
            affected = insert?.affected_rows;
            playerId = insert?.returning[0]?.id;
          }

          if (playerId) {
            try {
              await client.UpsertAccount({
                objects: player.Accounts.data.map((account) => ({
                  playerId,
                  type: account.type,
                  identifier: account.identifier,
                })),
                on_conflict: accountOnConflict,
              });
            } catch (accErr) {
              console.error(
                'Error updating accounts for Player',
                playerId,
                accErr,
                player.Accounts,
              );
            }
          }
        } catch (e) {
          console.warn('ERR! failed to update player', e);
          return player;
        }
        return undefined;
      },
      { concurrency: 10 },
    );
    const usersSkipped = result.filter(isNotNullOrUndefined);

    res.json({
      numSkipped: usersSkipped.length,
      [force ? 'numInserted' : 'numUpdated']:
        accountList.length - usersSkipped.length,
    });
  } catch (e) {
    const msg = (e as Error).message;
    console.warn('Error migrating players/accounts', msg);
    res.sendStatus(500);
  }
};
