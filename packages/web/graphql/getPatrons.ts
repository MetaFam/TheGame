import gql from 'fake-tag';

import {
  GetPatronsQuery,
  GetPatronsQueryVariables,
  GetpSeedHoldersQuery,
  GetpSeedHoldersQueryVariables,
  PlayerFragmentFragment,
  UserTokenFragmentFragment,
} from './autogen/types';
import { client } from './client';
import { PlayerFragment, UserTokenFragment } from './fragments';
import { Patron } from './types';

const patronsQuery = gql`
  query GetPatrons($addresses: [String!], $limit: Int) {
    player(where: { ethereum_address: { _in: $addresses } }, limit: $limit) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

const pSeedHoldersQuery = gql`
  query GetpSeedHolders($limit: Int) {
    userTokens(
      orderBy: pSeedBalance
      orderDirection: desc
      where: { pSeedBalance_gt: "0" }
      first: $limit
    ) {
      ...UserTokenFragment
    }
  }
  ${UserTokenFragment}
`;

const getPlayersFromAddresses = async (
  addresses: Array<string>,
  limit: number,
): Promise<Array<PlayerFragmentFragment>> => {
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

  return data.player;
};

const getpSeedHolders = async (
  limit: number,
): Promise<Array<UserTokenFragmentFragment>> => {
  const { data, error } = await client
    .query<GetpSeedHoldersQuery, GetpSeedHoldersQueryVariables>(
      pSeedHoldersQuery,
      {
        limit,
      },
    )
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.userTokens;
};

export const getPatrons = async (limit = 50): Promise<Array<Patron>> => {
  const userTokens: Array<UserTokenFragmentFragment> = await getpSeedHolders(
    limit,
  );

  const players: Array<PlayerFragmentFragment> = await getPlayersFromAddresses(
    userTokens.map((u) => u.address),
    limit,
  );

  const patrons: Array<Patron> = userTokens.reduce<Array<Patron>>((res, u) => {
    const player = players.find((p) => p.ethereum_address === u.address);
    if (player) {
      const patron = { ...player, pSeedBalance: u.pSeedBalance } as Patron;
      res.push(patron);
    }
    return res;
  }, []);

  return patrons;
};
