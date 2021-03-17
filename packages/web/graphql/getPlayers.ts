import gql from 'fake-tag';

import {
  GetPlayersQuery, GetPlayersQueryVariables,
} from './autogen/types';
import { client } from './client';
import { PlayerFragment } from './fragments';

const playersQuery = gql`
  query GetPlayers($limit: Int) {
    player(order_by: { total_xp: desc }, limit: $limit) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const getPlayers = async (limit = 50) => {
  const { data, error } = await (
    client
    .query<GetPlayersQuery, GetPlayersQueryVariables>(
      playersQuery, { limit },
    )
    .toPromise()
  );

  if (error) throw error;
  if (!data) return [];
  return data.player;
};
