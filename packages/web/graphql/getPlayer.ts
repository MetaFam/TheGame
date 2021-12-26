import gql from 'fake-tag';

import {
  GetPlayerForAddressQuery,
  GetPlayerForAddressQueryVariables,
  GetPlayerForUsernameQuery,
  GetPlayerForUsernameQueryVariables,
  Maybe,
  Player,
} from './autogen/types';
import { client } from './client';
import { PlayerFragment } from './fragments';

const usernameQuery = gql`
  query GetPlayerForUsername(
    $username: String!
    $forLoginDisplay: Boolean! = false
  ) {
    player(where: { profile: { username: { _ilike: $username } } }) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

const addressQuery = gql`
  query GetPlayerForAddress(
    $address: String!
    $forLoginDisplay: Boolean! = false
  ) {
    player(where: { ethereumAddress: { _ilike: $address } }) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const getPlayer = async (username?: string): Promise<Maybe<Player>> => {
  if (!username) return null;

  let response;
  if (/0x[0-9a-z]{40}/i.test(username)) {
    response = await client
      .query<GetPlayerForAddressQuery, GetPlayerForAddressQueryVariables>(
        addressQuery,
        { address: username },
      )
      .toPromise();
  } else {
    response = await client
      .query<GetPlayerForUsernameQuery, GetPlayerForUsernameQueryVariables>(
        usernameQuery,
        { username },
      )
      .toPromise();
  }

  const { data, error } = response;

  if (!data) {
    if (error) {
      throw error;
    }
    return null;
  }

  const [player] = data.player ?? [];
  return (player as Player) ?? null;
};
