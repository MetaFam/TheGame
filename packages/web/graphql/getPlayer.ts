import {
  GetPlayerForAddressQuery,
  GetPlayerForAddressQueryVariables,
  GetPlayerForUsernameQuery,
  GetPlayerForUsernameQueryVariables,
  Maybe,
  Player,
} from './autogen/types';
import { client } from './client';
import { PlayerDaoMembershipFragment, PlayerFragment } from './fragments';

const usernameQuery = /* GraphQL */ `
  query GetPlayerForUsername($username: String!) {
    player(where: { profile: { username: { _ilike: $username } } }) {
      ...PlayerFragment
      ...PlayerDaoMembershipFragment
    }
  }
  ${PlayerFragment}
  ${PlayerDaoMembershipFragment}
`;

const addressQuery = /* GraphQL */ `
  query GetPlayerForAddress($address: String!) {
    player(where: { ethereumAddress: { _ilike: $address } }) {
      ...PlayerFragment
      ...PlayerDaoMembershipFragment
    }
  }
  ${PlayerFragment}
  ${PlayerDaoMembershipFragment}
`;

export const getPlayer = async (
  username: string,
  noCache?: boolean,
): Promise<Maybe<Player>> => {
  let response;
  if (/^0x[0-9a-z]{40}$/i.test(username)) {
    response = await client
      .query<GetPlayerForAddressQuery, GetPlayerForAddressQueryVariables>(
        addressQuery,
        { address: username },
        noCache ? { requestPolicy: 'network-only' } : undefined,
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
