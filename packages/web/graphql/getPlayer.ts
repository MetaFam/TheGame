import gql from 'fake-tag';

import { GetPlayerQuery, GetPlayerQueryVariables } from './autogen/types';
import { client } from './client';
import { PlayerFragment } from './fragments';

const playerQuery = gql`
  query GetPlayer($username: String!) {
    Player(where: { username: { _eq: $username } }) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const getPlayer = async (username: string | undefined) => {
  if (!username) return null;
  const { data } = await client
    .query<GetPlayerQuery, GetPlayerQueryVariables>(playerQuery, { username })
    .toPromise();

  return data?.Player[0];
};
