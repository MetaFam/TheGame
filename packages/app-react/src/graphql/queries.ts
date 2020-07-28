import gql from 'graphql-tag';

import { AccountFragment, PlayerFragment, BoxProfileFragment } from './fragments';

export const GetPlayerFromId = gql`
  query GetPlayer($player_id: uuid) {
    Player(where: { id: { _eq: $player_id } }) {
      ...PlayerFragment
      box_profile {
        ...BoxProfileFragment
      } 
      Accounts {
        ...AccountFragment
      }
    }
  }
  ${PlayerFragment}
  ${AccountFragment}
  ${BoxProfileFragment}
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
