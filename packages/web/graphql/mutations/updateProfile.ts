import gql from 'fake-tag';

export const UpdateProfileMutation = gql`
  mutation UpdateProfile($playerId: uuid!, $input: Player_set_input!) {
    update_Player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      id
      availability_hours
      tz
    }
  }
`;
