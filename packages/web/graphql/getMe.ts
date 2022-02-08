import { PlayerFragment } from 'graphql/fragments';

export const GetMeQuery = /* GraphQL */ `
  query GetMe($forLoginDisplay: Boolean! = false) {
    me {
      id
      ethereumAddress
      username
      player {
        ...PlayerFragment
      }
    }
  }
  ${PlayerFragment}
`;
