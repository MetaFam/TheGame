// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  mutation UpdatePlayerUsername($playerId: uuid!, $username: String!) {
    update_profile(
      where: { playerId: { _eq: $playerId } }
      _set: { username: $username }
    ) {
      affected_rows
      returning {
        playerId
        username
      }
    }
  }

  mutation UpdateProfile($playerId: uuid!, $input: profile_set_input!) {
    update_profile(where: { playerId: { _eq: $playerId } }, _set: $input) {
      affected_rows
      returning {
        playerId
        username
      }
    }
  }

  mutation UpdateAboutYou($playerId: uuid!, $input: player_set_input!) {
    update_player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      id
      profile {
        explorerType {
          id
          description
          imageURL
          title
        }
      }
    }
  }

  mutation UpdatePlayerSkills($skills: [player_skill_insert_input!]!) {
    delete_player_skill(where: {}) {
      affected_rows
    }
    insert_player_skill(objects: $skills) {
      affected_rows
    }
  }

  mutation UpdatePlayerRoles($roles: [player_role_insert_input!]!) {
    delete_player_role(where: {}) {
      affected_rows
    }
    insert_player_role(objects: $roles) {
      affected_rows
    }
  }

  mutation UpdatePlayerProfileLayout($playerId: uuid!, $layout: String!) {
    update_player_by_pk(
      pk_columns: { id: $playerId }
      _set: { profileLayout: $layout }
    ) {
      id
      profileLayout
    }
  }
`;

export const UpdateProfilePronouns = /* GraphQL */ `
  mutation updateProfilePronouns($playerId: uuid!, $input: profile_set_input!) {
    update_profile(where: { playerId: { _eq: $playerId } }, _set: $input) {
      affected_rows
      returning {
        playerId
      }
    }
  }
`;
