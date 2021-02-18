import { isNotNullOrUndefined } from '@metafam/utils';
import bluebird from 'bluebird';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import api from 'sourcecred';

import {
  AccountType_Enum,
  Player_Account_Constraint,
  Player_Constraint,
  Player_Insert_Input,
  Player_Update_Column,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';
import { computeRank } from '../../../lib/rankHelpers';
import { AddressBookEntry, SCAccountsData, SCAlias } from './types';

const ACCOUNTS_FILE =
  'https://raw.githubusercontent.com/MetaFam/XP/gh-pages/output/accounts.json';
const ADDRESS_BOOK_FILE =
  'https://raw.githubusercontent.com/MetaFam/TheSource/master/addressbook.json';

const VALID_ACCOUNT_TYPES: Array<AccountType_Enum> = [
  AccountType_Enum.Ethereum,
  AccountType_Enum.Discord,
  AccountType_Enum.Discourse,
  AccountType_Enum.Github,
  AccountType_Enum.Twitter,
];

const parseMergedIdentityId = (alias: SCAlias) => {
  try {
    const addressParts = api.core.graph.NodeAddress.toParts(alias.address);

    if (
      addressParts[1].toUpperCase() === 'CORE' &&
      addressParts[2].toUpperCase() === 'IDENTITY'
    ) {
      return addressParts[addressParts.length - 1];
    }
    return null;
  } catch (e) {
    console.log('Unable to parse merged identity: ', {
      error: e.message,
      alias,
    });
    return null;
  }
};

const parseAlias = (alias: SCAlias) => {
  try {
    const addressParts = api.core.graph.NodeAddress.toParts(alias.address);
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
    console.log('Unable to parse alias: ', { error: e.message, alias });
    return null;
  }
};

export const migrateSourceCredAccounts = async (
  _: Request,
  res: Response,
): Promise<void> => {
  const accountsData: SCAccountsData = await (
    await fetch(ACCOUNTS_FILE)
  ).json();

  const addressBook: AddressBookEntry[] = await (
    await fetch(ADDRESS_BOOK_FILE)
  ).json();

  const accountOnConflict = {
    constraint: Player_Account_Constraint.AccountIdentifierTypeKey,
    update_columns: [],
  };

  const accountList = accountsData.accounts
    .filter((a) => a.account.identity.subtype === 'USER')
    .sort((a, b) => b.totalCred - a.totalCred)
    .map((a, index) => {
      const linkedAccounts = a.account.identity.aliases
        .map((alias) => {
          return parseAlias(alias);
        })
        .filter(isNotNullOrUndefined);

      const mergedIdentityIds = a.account.identity.aliases
        .map((alias) => parseMergedIdentityId(alias))
        .filter(isNotNullOrUndefined);

      const discordId = linkedAccounts.find(({ type }) => type === 'DISCORD')
        ?.identifier;

      const addressEntry =
        discordId && addressBook.find((adr) => adr.discordId === discordId);

      const rank = computeRank(index);
      return {
        ethereum_address: addressEntry && addressEntry.address,
        scIdentityId: a.account.identity.id,
        username: a.account.identity.name.toLowerCase(),
        totalXp: a.totalCred,
        rank,
        discordId,
        mergedIdentityIds,
        Accounts: {
          data: linkedAccounts,
          on_conflict: accountOnConflict,
        },
      };
    });

  try {
    const result = await bluebird.map(
      accountList,
      async (player) => {
        const vars = {
          username: player.username,
          ethAddress: player.ethereum_address,
          identityId: player.scIdentityId,
          rank: player.rank,
          totalXp: player.totalXp,
          discordId: player.discordId || '',
        };
        if (player.mergedIdentityIds.length) {
          await client.DeleteDuplicatePlayers({
            scIds: player.mergedIdentityIds,
          });
        }

        try {
          const updateResult = await client.UpdatePlayer(vars);
          const affected = updateResult.update_player?.affected_rows;
          if (affected === 0) {
            return player;
          }
          if (affected && affected > 1) {
            throw new Error('Multiple players updated incorrectly');
          }

          const playerId = updateResult.update_player?.returning[0]?.id;
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
    const usersToInsert: Player_Insert_Input[] = result
      .filter(isNotNullOrUndefined)
      .map((player) => ({
        username: player.username,
        ethereum_address: player.ethereum_address,
        sc_identity_id: player.scIdentityId,
        rank: player.rank,
        total_xp: player.totalXp,
      }));

    const resultInsert = await client.UpsertPlayer({
      objects: usersToInsert,
      onConflict: {
        constraint: Player_Constraint.PlayerEthereumAddressUniqueKey,
        update_columns: [
          Player_Update_Column.ScIdentityId,
          Player_Update_Column.Username,
          Player_Update_Column.TotalXp,
          Player_Update_Column.Rank,
        ],
      },
    });
    res.json({
      resultInsert,
      numUpdated: accountList.length - usersToInsert.length,
      numInserted: usersToInsert.length,
    });
  } catch (e) {
    console.warn('Error migrating players/accounts', e.message);
    res.sendStatus(500);
  }
};
