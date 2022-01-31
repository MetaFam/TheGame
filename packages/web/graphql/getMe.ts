import { PlayerFragment } from 'graphql/fragments';

export const GetMeQuery = /* GraphQL */ `
  query GetMe {
    me {
      player {
        id
        ethereumAddress
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
