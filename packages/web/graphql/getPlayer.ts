import gql from 'fake-tag';

import {
  GetPlayerQuery,
  GetPlayerQueryVariables,
  Maybe,
  Player,
} from './autogen/types';
import { client } from './client';
import { PlayerFragment } from './fragments';

const playerQuery = gql`
  query GetPlayer($username: String!, $forLoginDisplay: Boolean! = false) {
    player(where: { profile: { username: { _ilike: $username } } }) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const getPlayer = async (username?: string): Promise<Maybe<Player>> => {
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

  const [player] = data.player ?? [];
  return (player as Player) ?? null;
};
