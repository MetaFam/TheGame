import {
  GetPatronsQuery,
  GetPatronsQueryVariables,
  GetpSeedHoldersQuery,
  GetpSeedHoldersQueryVariables,
  GetPSeedPriceQuery,
  GetPSeedPriceQueryVariables,
  Player,
  SearchPatronsQuery,
  SearchPatronsQueryVariables,
  TokenBalancesFragment as TokenBalancesFragmentType,
} from 'graphql/autogen/types';
import { client } from 'graphql/client';
import { PlayerFragment, TokenBalancesFragment } from 'graphql/fragments';
import { Patron } from 'graphql/types';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  query GetpSeedBalance($address: String!) {
    getTokenBalances(address: $address) {
      ...TokenBalancesFragment
    }
  }
  ${TokenBalancesFragment}
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
  query GetpSeedHolders($limit: Int) {
    pSeedHolders: getTopPSeedHolders(limit: $limit) {
      ...TokenBalancesFragment
    }
  }
  ${TokenBalancesFragment}
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

  if (!data) {
    if (error) {
      throw error;
    }
    return [];
  }

  return data.player as Array<Player>;
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

  if (!data) {
    if (error) {
      throw error;
    }
    return [];
  }

  return data.player as Array<Player>;
};

export const getPSeedHolders = async (
  limit: number,
): Promise<Array<TokenBalancesFragmentType>> => {
  const { data, error } = await client
    .query<GetpSeedHoldersQuery, GetpSeedHoldersQueryVariables>(
      pSeedHoldersQuery,
      { limit },
    )
    .toPromise();

  if (!data || !data.pSeedHolders) {
    if (error) {
      throw error;
    }
    return [];
  }

  return data.pSeedHolders;
};

export const getPatrons = async (limit = 50): Promise<Array<Patron>> => {
  const tokenBalances: Array<TokenBalancesFragmentType> = await getPSeedHolders(
    limit,
  );

  const players: Array<Player> = await getPlayersFromAddresses(
    tokenBalances.map(({ address }) => address),
    limit,
  );

  const patrons: Array<Patron> = tokenBalances.reduce<Array<Patron>>(
    (res, u) => {
      const player = players.find((p) => p.ethereumAddress === u.address);
      if (player) {
        const patron = { ...player, pSeedBalance: u.pSeedBalance } as Patron;
        res.push(patron);
      }
      return res;
    },
    [],
  );

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

  return parseFloat(data.getPSeedInfo.priceUsd);
};

export const searchPatrons = async (
  search: string,
  limit?: number,
): Promise<Array<Patron>> => {
  const totalPatrons = 150;
  const tokenBalances: Array<TokenBalancesFragmentType> = await getPSeedHolders(
    totalPatrons,
  );

  const players: Array<Player> = await searchPlayers(
    tokenBalances.map(({ address }) => address),
    search,
    limit ?? totalPatrons,
  );

  const patrons: Array<Patron> = tokenBalances.reduce<Array<Patron>>(
    (res, u) => {
      const player = players.find((p) => p.ethereumAddress === u.address);
      if (player) {
        const patron = { ...player, pSeedBalance: u.pSeedBalance } as Patron;
        res.push(patron);
      }
      return res;
    },
    [],
  );

  return patrons;
};
