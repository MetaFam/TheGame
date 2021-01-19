import gql from 'fake-tag';

export const UpdateUsernameMutation = gql`
  mutation UpdatePlayerUsername($username: String!) {
    update_player(_set: { username: $username }, where: {}) {
      returning {
        id
        username
      }
    }
  }
`;
