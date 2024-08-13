import { PlayerDaoMembershipFragment, PlayerFragment } from '#graphql/fragments';

export const getMeQuery = /* GraphQL */ `
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

export const getMeHasuraFieldsQuery = /* GraphQL */ `
  query GetMeHasuraFields {
    me {
      player {
        ...PlayerFragment
        ...PlayerDaoMembershipFragment
      }
    }
  }
  ${PlayerFragment}
  ${PlayerDaoMembershipFragment}
`;
