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

  mutation AddGuildMember($guildId: uuid!, $playerId: uuid!) {
    insert_guild_player(
      objects: { guildId: $guildId, playerId: $playerId, visible: true }
    ) {
      affected_rows
      returning {
        playerId
      }
    }
  }

  mutation DeleteGuildMember($guildId: uuid!, $playerId: uuid!) {
    delete_guild_player(
      where: { playerId: { _eq: $playerId }, guildId: { _eq: $guildId } }
    ) {
      affected_rows
    }
  }

  mutation UpdatePlayerGuildVisibility(
    $guildId: uuid!
    $playerId: uuid!
    $visible: Boolean!
  ) {
    update_guild_player(
      where: { guildId: { _eq: $guildId }, playerId: { _eq: $playerId } }
      _set: { visible: $visible }
    ) {
      affected_rows
      returning {
        guildId
        playerId
        visible
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
      object: { name: $name, type: $type, url: $url, playerId: $playerId }
    ) {
      id
    }
  }

  mutation DeletePlayerLink($id: uuid!) {
    delete_link(where: { id: { _eq: $id } }) {
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
      where: { id: { _eq: $id } }
      _set: { name: $name, type: $type, url: $url }
    ) {
      affected_rows
    }
  }

  mutation InsertPlayerQuestchainPin($playerId: uuid!, $questchainId: String!) {
    insert_pinned_questchains_one(
      object: { player_id: $playerId, questchain_id: $questchainId }
    ) {
      player_id
      questchain_id
    }
  }

  mutation DeletePlayerQuestchainPin($playerId: uuid!, $questchainId: String!) {
    delete_pinned_questchains(
      where: {
        player_id: { _eq: $playerId }
        questchain_id: { _eq: $questchainId }
      }
    ) {
      affected_rows
    }
  }

  mutation GetPlayerLinksNoCache($playerId: uuid!, $updatedAt: timestamptz!) {
    update_player(
      where: { id: { _eq: $playerId } }
      _set: { updatedAt: $updatedAt }
    ) {
      returning {
        links {
          id
          name
          type
          url
          playerId
        }
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
