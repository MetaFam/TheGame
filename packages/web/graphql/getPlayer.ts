import gql from 'fake-tag';

import {
  GetPlayerQuery,
  GetPlayerQueryVariables,
  PlayerFragmentFragment,
} from './autogen/types';
import { client } from './client';
import { PlayerFragment } from './fragments';

const playerQuery = gql`
  query GetPlayer($username: String!) {
    player(where: { username: { _eq: $username } }) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const getPlayer = async (
  username: string | undefined,
): Promise<PlayerFragmentFragment | null> => {
  if (!username) return null;

  const { data, error } = await client
    .query<GetPlayerQuery, GetPlayerQueryVariables>(playerQuery, { username })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return null;
  }

  return data.player?.[0] ?? null;
};
