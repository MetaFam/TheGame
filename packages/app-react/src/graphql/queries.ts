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

export default queries;
