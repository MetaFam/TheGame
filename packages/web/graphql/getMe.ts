import { PlayerFragment } from 'graphql/fragments';

export const GetMeQuery = /* GraphQL */ `
  query GetMe($forLoginDisplay: Boolean! = false) {
    me {
      record: player {
        ...PlayerFragment
        createdAt
      }
    }
  }
  ${PlayerFragment}
`;
