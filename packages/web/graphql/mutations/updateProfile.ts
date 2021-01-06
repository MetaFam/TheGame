import gql from 'fake-tag';

export const UpdateProfileMutation = gql`
  mutation UpdateProfile($playerId: uuid!, $input: player_set_input!) {
    update_player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      id
      availability_hours
      timezone
    }
  }
`;
 