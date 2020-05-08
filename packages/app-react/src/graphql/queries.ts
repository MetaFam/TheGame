import gql from 'graphql-tag';

import fragments from './fragments';

const queries: any = {};

queries.get_Player = gql`
query GetPlayer {
  Player {
    ...PlayerFragment
  }
}
${fragments.PlayerFragment}
`;

queries.get_MyPlayer = gql`
query GetPlayer($player_id: uuid)  {
  Player(
  where: { id: { _eq: $player_id } }
  ) { 
    ...PlayerFragment
  }
}
${fragments.PlayerFragment}
`;

queries.get_MyAccount = gql`
query GetMyAccount($eth_address: String) {
  Account(
    where: { 
      identifier: { _eq: $eth_address },
      type: { _eq: "ETHEREUM" }
    }
  ) {
    ...AccountFragment
    Player {
      ...PlayerFragment
    }
  }
}
${fragments.PlayerFragment}
${fragments.AccountFragment}
`;

export default queries;
