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

queries.get_MyProfile = gql`
query GetMyProfile($ethAddress: String) {
  Profile(
  where: { identifier: { _eq: $ethAddress } }
  ) {
    ...ProfileFragment
    Player {
      ...PlayerFragment
    }
  }
}
${fragments.PlayerFragment}
${fragments.ProfileFragment}
`;

export default queries;
