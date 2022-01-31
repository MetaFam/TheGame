import { PlayerFragment } from 'graphql/fragments';

export const GetMeQuery = /* GraphQL */ `
  query GetMe {
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

export const GetLoginBasicsQuery = /* GraphQL */ `
  query GetLoginBasics {
    me {
      player {
        id
        ethereumAddress
        rank
        totalXP
        profile {
          name
          username
          profileImageURL
        }
      }
    }
  }
`;
