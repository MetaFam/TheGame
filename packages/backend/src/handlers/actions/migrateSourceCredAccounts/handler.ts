import {
  Constants,
  getLatestEthAddress,
  isNotNullOrUndefined,
} from '@metafam/utils';
import bluebird from 'bluebird';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { SCAccountsData, SCAlias, sourcecred as sc } from 'sourcecred';

import {
  AccountType_Enum,
  Player_Account_Constraint,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';
import { computeRank } from '../../../lib/rankHelpers';
import { ledgerManager } from '../../../lib/sourcecredLedger';
import { getNumWeeksInSeason } from '../../../lib/xpHelpers';

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

    if (VALID_ACCOUNT_TYPES.indexOf(type) < 0) {
      return null;
    }

    const identifier = addressParts[addressParts.length - 1];

    return {
      type,
      identifier,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Unable to parse alias: ', { error: e.message, alias });
    return null;
  }
};

export const migrateSourceCredAccounts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const ledgerRes = await ledgerManager.reloadLedger();
  if (ledgerRes.error) {
    throw new Error(`Unable to load ledger: ${ledgerRes.error}`);
  }

  const force = req.query.force != null;
  console.log(`Updating players from sourcecred. Force-insert? ${force}`);

  const accountsData: SCAccountsData = await (
    await fetch(Constants.SC_ACCOUNTS_FILE)
  ).json();
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

      const discordId = linkedAccounts.find(({ type }) => type === 'DISCORD')
        ?.identifier;

      const ethAddress = getLatestEthAddress(a.account.identity);

      if (!ethAddress) return null;

      const rank = computeRank(index);
      const userWeeklyCred = a.cred;
      const seasonXp = userWeeklyCred
        .slice(-numWeeksInSeason)
        .reduce((t, c) => t + c, 0);
      return {
        ethereum_address: ethAddress.toLowerCase(),
        scIdentityId: a.account.identity.id,
        totalXp: a.totalCred,
        seasonXp,
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
          ethAddress: player.ethereum_address,
          rank: player.rank,
          totalXp: player.totalXp,
          seasonXp: player.seasonXp,
          discordId: player.discordId,
        };

        try {
          const updateResult = await client.UpdatePlayer(vars);

          let playerId: string;
          let affected = updateResult.update_player?.affected_rows;

          if (affected === 0) {
            if (!force) {
              return player;
            }

            // 'force' indicates we should insert new players if they don't already exist.
            const upsertResult = await client.InsertPlayers({
              objects: [
                {
                  username: player.ethereum_address,
                  ethereum_address: player.ethereum_address,
                  rank: player.rank,
                  total_xp: player.totalXp,
                  season_xp: player.seasonXp,
                },
              ],
            });
            affected = upsertResult.insert_player?.affected_rows;
            playerId = upsertResult.insert_player?.returning[0]?.id;
          } else {
            playerId = updateResult.update_player?.returning[0]?.id;
          }
          if (affected && affected > 1) {
            throw new Error('Multiple players updated incorrectly');
          }

          if (playerId) {
            try {
              await client.UpsertAccount({
                objects: player.Accounts.data.map((account) => ({
                  player_id: playerId,
                  type: account.type,
                  identifier: account.identifier,
                })),
                on_conflict: accountOnConflict,
              });
            } catch (accErr) {
              console.log(
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
    console.warn('Error migrating players/accounts', e.message);
    res.sendStatus(500);
  }
};
