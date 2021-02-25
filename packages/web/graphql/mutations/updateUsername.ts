import gql from 'fake-tag';

export const UpdateUsernameMutation = gql`
  mutation UpdatePlayerUsername($playerId: uuid!, $username: String!) {
    update_player_by_pk(pk_columns: { id: $playerId }, _set: { username: $username }) {
      id
      username
    }
  }
`;
