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

const LIMIT = 50;
const TOTAL_PLAYERS = 150;

export const getTopPlayers = async (): Promise<PlayerFragmentFragment[]> => {
  const promises: Promise<PlayerFragmentFragment[]>[] = new Array(
    TOTAL_PLAYERS / LIMIT,
  )
    .fill(false)
    .map((_, i) => getPlayers(LIMIT, i * LIMIT));
  const playersArr = await Promise.all(promises);
  return playersArr.reduce((_total, _players) => [..._total, ..._players], []);
};
