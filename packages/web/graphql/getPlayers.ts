import gql from 'fake-tag';

import {
  GetPlayersQuery,
  GetPlayersQueryVariables,
  PlayerFragmentFragment,
} from './autogen/types';
import { client } from './client';
import { PlayerFragment } from './fragments';

const playersQuery = gql`
  query GetPlayers($limit: Int, $offset: Int) {
    player(order_by: { total_xp: desc }, limit: $limit, offset: $offset) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const getPlayers = async (
  limit = 50,
  offset = 0,
): Promise<PlayerFragmentFragment[]> => {
  const { data, error } = await client
    .query<GetPlayersQuery, GetPlayersQueryVariables>(playersQuery, {
      limit,
      offset,
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
