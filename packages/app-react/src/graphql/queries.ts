import gql from 'graphql-tag';

import { AccountFragment, PlayerFragment } from './fragments';

export const GetPlayerFromId = gql`
  query GetPlayer($player_id: uuid) {
    Player(where: { id: { _eq: $player_id } }) {
      ...PlayerFragment
      Accounts {
        ...AccountFragment
      }
    }
  }
  ${PlayerFragment}
  ${AccountFragment}
`;

export const GetPlayerFromAddress = gql`
  query GetMyPlayer($ethereum_address: String) {
    Player(
      where: { ethereum_address: { _eq: $ethereum_address } }
    ) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;
