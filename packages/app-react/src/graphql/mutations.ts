import gql from 'graphql-tag';

export const UpdateBoxProfiles = gql`
  mutation UpdateBoxProfiles {
    updateBoxProfile {
      success
      updatedProfiles
    }
  }
`;

export const UpdateUsername = gql`
  mutation UpdateUsername($username: String!) {
    update_Player(where: {}, _set: { username: $username }) {
      affected_rows
      returning {
        id
        username
      }
    }
  }
`;
