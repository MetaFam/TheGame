import gql from 'fake-tag';

import { PlayerFragment } from './fragments';

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
