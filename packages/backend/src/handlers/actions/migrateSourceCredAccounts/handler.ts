import { isNotNullOrUndefined } from '@metafam/utils';
import bluebird from 'bluebird';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import api from 'sourcecred';

import {
  Account_Constraint,
  Player_Constraint,
  Player_Rank_Enum,
  Player_Update_Column,
  Scalars,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';
import { AddressBookEntry, SCAccountsData, SCAlias } from './types';

const ACCOUNTS_FILE =
  'https://raw.githubusercontent.com/MetaFam/XP/gh-pages/output/accounts.json';
const ADDRESS_BOOK_FILE =
  'https://raw.githubusercontent.com/MetaFam/TheSource/master/addressbook.json';

const VALID_ACCOUNT_TYPES: Array<Scalars['account_type']> = [
  'ETHEREUM',
  'DISCORD',
  'DISCOURSE',
  'GITHUB',
  'TWITTER',
];

const parseAlias = (alias: SCAlias) => {
  try {
    const addressParts = api.core.graph.NodeAddress.toParts(alias.address);
    const type = addressParts[1]?.toUpperCase() as Scalars['account_type'];

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

const RANKS = [
  Player_Rank_Enum.Diamond,
  Player_Rank_Enum.Platinum,
  Player_Rank_Enum.Gold,
  Player_Rank_Enum.Silver,
  Player_Rank_Enum.Bronze,
];

const NUM_PLAYERS_PER_RANK = 10;

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
    constraint: Account_Constraint.AccountIdentifierTypeKey,
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

      const discordId = linkedAccounts.find(({ type }) => type === 'DISCORD')
        ?.identifier;

      const addressEntry =
        discordId && addressBook.find((adr) => adr.discordId === discordId);
      return {
        ethereum_address: addressEntry && addressEntry.address,
        scIdentityId: a.account.identity.id,
        username: a.account.identity.name.toLowerCase(),
        totalXp: a.totalCred,
        rank: RANKS[Math.floor(index / NUM_PLAYERS_PER_RANK)],
        discordId,
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

        try {
          const updateResult = await client.UpdatePlayer(vars);
          const affected = updateResult.update_Player?.affected_rows;
          if (affected === 0) {
            return player;
          }
          if (affected && affected > 1) {
            throw new Error('Multiple players updated incorrectly');
          }

          const playerId = updateResult.update_Player?.returning[0]?.id;
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
    const usersToInsert = result
      .filter(isNotNullOrUndefined)
      .map(({ discordId, ...user }) => user);

    const resultInsert = await client.UpsertPlayer({
      objects: usersToInsert,
      onConflict: {
        constraint: Player_Constraint.PlayerEthereumAddressKey,
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
