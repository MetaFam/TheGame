import gql from 'fake-tag';

export const UpdateUsernameMutation = gql`
  mutation UpdatePlayerUsername($playerId: uuid!, $username: String!) {
    update_player_by_pk(
      pk_columns: { id: $playerId }
      _set: { username: $username }
    ) {
      id
      username
    }
  }
`;

export const UpdateProfileMutation = gql`
  mutation UpdateProfile($playerId: uuid!, $input: player_set_input!) {
    update_player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      id
      availability_hours
      timezone
    }
  }
`;

export const UpdateAboutYouMutation = gql`
  mutation UpdateAboutYou($playerId: uuid!, $input: player_set_input!) {
    update_player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      color_mask
      playerType {
        description
        id
        imageUrl
        title
      }
      id
    }
  }
`;

export const UpdateSkillsMutation = gql`
  mutation UpdatePlayerSkills($skills: [player_skill_insert_input!]!) {
    delete_player_skill(where: {}) {
      affected_rows
    }
    insert_player_skill(objects: $skills) {
      affected_rows
    }
  }
`;

export const UpdateProfilePronouns = gql`
  mutation updateProfilePronouns($playerId: uuid!, $input: player_set_input!) {
    update_player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      id
      availability_hours
      timezone
    }
  }
`;
