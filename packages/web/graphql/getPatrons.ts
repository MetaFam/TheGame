import {
  GetPatronsQuery,
  GetPatronsQueryVariables,
  GetPSeedHoldersQuery,
  GetPSeedHoldersQueryVariables,
  GetPSeedPriceQuery,
  GetPSeedPriceQueryVariables,
  Player,
  PSeedHolder,
  SearchPatronsQuery,
  SearchPatronsQueryVariables,
} from 'graphql/autogen/hasura-sdk';

import { client } from '#graphql/client';
import { PlayerFragment } from '#graphql/fragments';
import { Patron } from '#graphql/types';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  query GetPSeedBalance($address: String!) {
    getTokenBalances(address: $address) {
      id
      SEED
      pSEED
    }
  }
`;

const patronsQuery = /* GraphQL */ `
  query GetPatrons($addresses: [String!], $limit: Int) {
    player(where: { ethereumAddress: { _in: $addresses } }, limit: $limit) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

const searchPatronsQuery = /* GraphQL */ `
  query SearchPatrons($addresses: [String!], $limit: Int, $search: String!) {
    player(
      where: {
        ethereumAddress: { _in: $addresses }
        _or: [
          {
            profile: {
              _or: [
                { username: { _ilike: $search } }
                { name: { _ilike: $search } }
              ]
            }
          }
          { ethereumAddress: { _ilike: $search } }
        ]
      }
      limit: $limit
    ) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

const pSeedHoldersQuery = /* GraphQL */ `
  query GetPSeedHolders($limit: Int) {
    pSeedHolders: getTopPSeedHolders(limit: $limit) {
      id
      balance
    }
  }
`;

const getPSeedPriceQuery = /* GraphQL */ `
  query GetPSeedPrice {
    getPSeedInfo {
      priceUsd
    }
  }
`;

const getPlayersFromAddresses = async (
  addresses: Array<string>,
  limit: number,
): Promise<Array<Player>> => {
  const { data, error } = await client
    .query<GetPatronsQuery, GetPatronsQueryVariables>(patronsQuery, {
      addresses,
      limit,
    })
    .toPromise();

  if (error) throw error;
  return (data?.player ?? []) as Array<Player>;
};

const searchPlayers = async (
  addresses: Array<string>,
  search: string,
  limit: number,
): Promise<Array<Player>> => {
  const { data, error } = await client
    .query<SearchPatronsQuery, SearchPatronsQueryVariables>(
      searchPatronsQuery,
      {
        addresses,
        limit,
        search: `%${search}%`,
      },
    )
    .toPromise();

  if (error) throw error;
  return (data?.player ?? []) as Array<Player>;
};

export const getPSeedHolders = async (limit: number) => {
  const { data, error } = await client
    .query<GetPSeedHoldersQuery, GetPSeedHoldersQueryVariables>(
      pSeedHoldersQuery,
      { limit },
    )
    .toPromise();

  if (error) throw error;
  return (data?.pSeedHolders ?? []).filter((h) => !!h) as Array<PSeedHolder>;
};

export const getPatrons = async (limit = 50) => {
  const holders = await getPSeedHolders(limit);

  const players = await getPlayersFromAddresses(
    holders.map(({ id }) => id),
    limit,
  );

  const patrons: Array<Patron> = holders.reduce<Array<Patron>>((res, u) => {
    const player = players.find((p) => p.ethereumAddress === u.id);
    if (player) {
      const patron = { ...player, pSeedBalance: u.balance } as Patron;
      res.push(patron);
    }
    return res;
  }, []);

  return patrons;
};

export const getPSeedPrice = async (): Promise<number> => {
  const { data, error } = await client
    .query<GetPSeedPriceQuery, GetPSeedPriceQueryVariables>(
      getPSeedPriceQuery,
      {},
    )
    .toPromise();

  if (data?.getPSeedInfo?.priceUsd == null) {
    if (error) {
      throw error;
    }
    throw new Error('Could not determine pSeed USD value.');
  }

  return Number(data.getPSeedInfo.priceUsd);
};

export const searchPatrons = async (search: string, limit?: number) => {
  const maxPatrons = 150;
  const holders = await getPSeedHolders(maxPatrons);

  const players: Array<Player> = await searchPlayers(
    holders.map(({ id }) => id),
    search,
    limit ?? maxPatrons,
  );

  const patrons: Array<Patron> = [];
  holders.forEach((hold) => {
    const player = players.find((p) => p.ethereumAddress === hold.id);
    if (player) {
      const patron = { ...player, pSeedBalance: hold.balance };
      patrons.push(patron);
    }
  });

  return patrons;
};
