import {
  GetPatronsQuery,
  GetPatronsQueryVariables,
  GetpSeedHoldersQuery,
  GetpSeedHoldersQueryVariables,
  Player,
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
  query GetPatrons(
    $addresses: [String!]
    $limit: Int
    $forLoginDisplay: Boolean! = false
  ) {
    player(where: { ethereumAddress: { _in: $addresses } }, limit: $limit) {
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

const getpSeedHolders = async (
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
  const tokenBalances: Array<TokenBalancesFragmentType> = await getpSeedHolders(
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
