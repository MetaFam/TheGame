import { Request, Response } from 'express';
import fetch from 'node-fetch';

import {
  Account_Constraint,
  Account_Update_Column,
  Player_Constraint,
  Player_Rank_Enum,
  Player_Update_Column,
  Scalars,
} from '../../../lib/autogen/sdk';
import { client } from '../../../lib/hasuraClient';
import { AddressBookEntry, SCAccountsData } from './types';

const ACCOUNTS_FILE =
  'https://raw.githubusercontent.com/MetaFam/XP/gh-pages/output/accounts.json';
const ADDRESS_BOOK_FILE =
  'https://raw.githubusercontent.com/MetaFam/TheSource/master/addressbook.json';

const parseAlias = (alias: string) => {
  const [type, identifier] = alias.split('/');

  return {
    type: type.toUpperCase() as Scalars['account_type'],
    identifier,
  };
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
    constraint: Account_Constraint.AccountIdentifierTypePlayerKey,
    update_columns: [Account_Update_Column.Identifier],
  };

  const accountList = accountsData.accounts
    .filter((a) => a.account.identity.subtype === 'USER')
    .sort((a, b) => b.totalCred - a.totalCred)
    .map((a, index) => {
      const discordAlias = a.account.identity.aliases.find(
        (alias) => alias.description.indexOf(`discord/`) >= 0,
      );
      const discordId =
        discordAlias && discordAlias.description.split('discord/')[1];
      const addressEntry =
        discordId && addressBook.find((adr) => adr.discordId === discordId);
      return {
        ethereum_address: addressEntry && addressEntry.address,
        scIdentityId: a.account.identity.id,
        username: a.account.identity.name,
        totalXp: a.totalCred,
        rank: RANKS[Math.floor(index / NUM_PLAYERS_PER_RANK)],
        Accounts: {
          data: a.account.identity.aliases.map((alias) => {
            return parseAlias(alias.description);
          }),
          on_conflict: accountOnConflict,
        },
      };
    });

  const result = await client.UpsertPlayer({
    objects: accountList,
    onConflict: {
      constraint: Player_Constraint.PlayerScIdentityIdKey,
      update_columns: [
        Player_Update_Column.EthereumAddress,
        Player_Update_Column.Username,
        Player_Update_Column.TotalXp,
        Player_Update_Column.Rank,
      ],
    },
  });

  res.json(result);
};
