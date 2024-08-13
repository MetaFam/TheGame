import { Optional } from '@metafam/utils';

import {
  GetPlayerDeworkUsernameQuery,
  GetPlayerDeworkUsernameQueryVariables,
} from './autogen/hasura-sdk';
import { client } from './client';

const playerDeworkUsernameQuery = /* GraphQL */ `
  query GetPlayerDeworkUsername($playerId: uuid!) {
    player_account(
      where: { playerId: { _eq: $playerId }, type: { _eq: DEWORK } }
    ) {
      identifier
    }
  }
`;

export const getPlayerDeworkUsername = async (
  playerId: string,
): Promise<Optional<string>> => {
  if (!playerId) return '';
  const { data } = await client
    .query<GetPlayerDeworkUsernameQuery, GetPlayerDeworkUsernameQueryVariables>(
      playerDeworkUsernameQuery,
      { playerId },
    )
    .toPromise();

  const username = data?.player_account[0]?.identifier;
  return username;
};
