import gql from 'fake-tag';

export const UpdateUsernameMutation = gql`
  mutation UpdatePlayerUsername($username: String!) {
    update_Player(_set: { username: $username }, where: {}) {
      returning {
        id
        username
      }
    }
  }
`;
