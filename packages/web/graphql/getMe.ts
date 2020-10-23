import gql from 'fake-tag';

import { PlayerFragment } from 'graphql/fragments';

export const GetMeQuery = gql`
  query GetMe {
    me {
      id
      ethereum_address
      username
      player {
        ...PlayerFragment
      }
    }
  }
  ${PlayerFragment}
`;
