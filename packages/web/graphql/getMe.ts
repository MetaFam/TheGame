import { PlayerFragment } from 'graphql/fragments';

export const GetMeQuery = /* GraphQL */ `
  query GetMe {
    me {
      record: player {
        ...PlayerFragment
        dashboardLayout
        createdAt
      }
    }
  }
  ${PlayerFragment}
`;
