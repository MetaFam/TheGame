import {
  Constants,
  fetch,
  getLatestEthAddress,
  getNumWeeksInSeason,
  isDefined,
} from '@metafam/utils';
import bluebird from 'bluebird';
import { Request, Response } from 'express';
import { SCAccountsData, SCAlias, sourcecred as sc } from 'sourcecred';

import {
  AccountType_Enum,
  Player_Account_Constraint,
} from '../../../lib/autogen/hasura-sdk.js';
import { client } from '../../../lib/hasuraClient.js';
import { computeRank } from '../../../lib/rankHelpers.js';
import { ledgerManager } from '../../../lib/sourcecredLedger.js';

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

    const [identifier] = addressParts.slice(-1);

    return { type, identifier };
  } catch (e) {
    console.error('Unable to parse alias:', {
      error: (e as Error).message,
      alias,
    });
    return null;
  }
};

export const syncSourceCredAccounts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error: loadError } = await ledgerManager.reloadLedger();

  if (loadError) {
    throw new Error(
      `Unable to load ledger: ${loadError}.\n` +
        'Make sure you have a valid GITHUB_API_TOKEN set in your .env ' +
        'that has access to https://github.com/MetaFam/XP.',
    );
  }

  const force = req.query.force != null;
  console.debug(`Updating players from SourceCred. Force-insert? ${force}`);

  const accountsResult = await fetch(Constants.SC_ACCOUNTS_FILE);
  const accountsData = (await accountsResult.json()) as SCAccountsData;
  const accountOnConflict = {
    constraint: Player_Account_Constraint.PlayerAccountTypePlayerIdKey,
    update_columns: [],
  };

  const numWeeksInSeason = getNumWeeksInSeason();

  // The easiest way to handle new seasons & replacement eth
  // addresses is to reset all stats & overwrite them.
  await client.ResetAllPlayersXP();

  const rawAccountList = accountsData.accounts
    .filter((a) => a.account.identity.subtype === 'USER')
    .sort((a, b) => b.totalCred - a.totalCred)
    .map((a, index) => {
      const linkedAccounts = a.account.identity.aliases
        .map(parseAlias)
        .filter(isDefined);

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
        accounts: {
          // Omit the discord account, as that is updated directly on the player table
          data: linkedAccounts.filter(
            ({ type }) => type !== AccountType_Enum.Discord,
          ),
          on_conflict: accountOnConflict,
        },
      };
    });

  const accountsFound = rawAccountList.length;
  const accountList = rawAccountList.filter(isDefined);
  const numUnclaimed = accountsFound - accountList.length;

  let numSkipped = 0;
  let numUpdated = 0;
  let numInserted = 0;

  try {
    await bluebird.map(
      accountList,
      async (player) => {
        const vars = {
          ethereumAddress: player.ethereumAddress,
          rank: player.rank,
          totalXP: player.totalXP,
          seasonXP: player.seasonXP,
          discordId: player.discordId,
        };

        try {
          const { update_player: update } = await client.UpdatePlayer(vars);

          let playerId: string = update?.returning[0]?.id;
          const { affected_rows: updated } = update ?? {};

          if (!updated || updated === 0) {
            if (!force) {
              throw new Error(
                `Skipping nonexistent player: ${player.ethereumAddress}.`,
              );
            }

            // 'force' indicates we should insert new players
            // if they don't already exist.
            const { insert_player: insert } = await client.InsertPlayers({
              objects: [vars],
            });
            numInserted += insert?.affected_rows ?? 0;
            playerId = insert?.returning[0]?.id;
          } else if (updated > 1) {
            throw new Error(
              `Error: Multiple players (${updated}) updated: ${player.ethereumAddress}`,
            );
          } else {
            numUpdated += updated;
          }

          if (playerId) {
            try {
              await client.UpsertAccount({
                objects: player.accounts.data.map((account) => ({
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
                player.accounts,
              );
            }
          }
        } catch (e) {
          console.warn(
            `Error: Failed to update player: "${(e as Error).message}"`,
          );
          numSkipped += 1;
        }
      },
      { concurrency: 10 },
    );

    res.json({
      numSkipped,
      numUpdated,
      numInserted,
      numUnclaimed,
    });
  } catch (e) {
    const msg = (e as Error).message ?? e;
    const out = `Error migrating SourceCred accounts: ${msg}`;
    console.warn(out);
    res.status(500).send(out);
  }
};
