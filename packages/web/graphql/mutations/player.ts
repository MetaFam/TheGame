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

  mutation UpdatePlayerProfileLayout($playerId: uuid!, $profileLayout: String!) {
    update_player_by_pk(
      pk_columns: { id: $playerId }
      _set: { profileLayout: $profileLayout }
    ) {
      id
      profileLayout
    }
  }

  mutation UpdatePlayerDashboardLayout($playerId: uuid!, $dashboardLayout: String!) {
    update_player_by_pk(
      pk_columns: { id: $playerId }
      _set: { dashboardLayout: $dashboardLayout }
    ) {
      id
      dashboardLayout
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
