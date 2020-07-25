import gql from 'graphql-tag';

import { AccountFragment, PlayerFragment } from './fragments';

export const GetPlayer = gql`
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

export const GetMyAccount = gql`
  query GetMyAccount($eth_address: String) {
    Account(
      where: { identifier: { _eq: $eth_address }, type: { _eq: "ETHEREUM" } }
    ) {
      ...AccountFragment
      Player {
        ...PlayerFragment
      }
    }
  }
  ${PlayerFragment}
  ${AccountFragment}
`;
