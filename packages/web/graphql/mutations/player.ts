export const updatePlayerMutations = /* GraphQL */ `
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

  mutation AddPlayerLink(
    $playerId: uuid!
    $name: String
    $url: String!
    $type: LinkType_enum
  ) {
    insert_link_one(
      object: { name: $name, type: $type, url: $url, player_id: $playerId }
    ) {
      id
    }
  }

  mutation DeletePlayerLink(
    $id: uuid!
  ) {
    delete_link(
      where: { id: { _eq: $id } }
    ) {
      affected_rows
    }
  }

  mutation UpdatePlayerLink(
    $id: uuid!
    $name: String
    $url: String!
    $type: LinkType_enum
  ) {
    update_link(
      where: {id: {_eq: $id}}, _set: {name: $name, type: $type, url: $url}
    ) {
      affected_rows
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

  mutation UpdatePlayerProfileLayout(
    $playerId: uuid!
    $profileLayout: String!
  ) {
    update_player_by_pk(
      pk_columns: { id: $playerId }
      _set: { profileLayout: $profileLayout }
    ) {
      id
      profileLayout
    }
  }

  mutation UpdatePlayerDashboardLayout(
    $playerId: uuid!
    $dashboardLayout: String!
  ) {
    update_player_by_pk(
      pk_columns: { id: $playerId }
      _set: { dashboardLayout: $dashboardLayout }
    ) {
      id
      dashboardLayout
    }
  }

  mutation LinkOwnCeramicNode($documentId: String!) {
    linkCeramicProfileNode(nodeId: $documentId) {
      verified
    }
  }

  mutation InsertPlayerAccount($account: player_account_insert_input!) {
    insert_player_account_one(object: $account) {
      playerId
      type
      identifier
    }
  }

  mutation RemovePlayerAccount(
    $playerId: uuid!
    $accountType: AccountType_enum!
  ) {
    delete_player_account(
      where: { playerId: { _eq: $playerId }, type: { _eq: $accountType } }
    ) {
      affected_rows
    }
  }
`;
