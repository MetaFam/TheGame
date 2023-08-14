export const PlayerMutations = /* GraphQL */ `
  mutation CreatePlayerFromETH($ethereumAddress: String!) {
    insert_profile(
      objects: [{ player: { data: { ethereumAddress: $ethereumAddress } } }]
    ) {
      affected_rows
      returning {
        id
        player {
          id
          ethereumAddress
        }
      }
    }
  }

  mutation UpsertAccount(
    $objects: [player_account_insert_input!]!
    $on_conflict: player_account_on_conflict = {
      constraint: player_account_type_player_id_key
      update_columns: [playerId]
    }
  ) {
    insert_player_account(objects: $objects, on_conflict: $on_conflict) {
      affected_rows
    }
  }

  mutation ResetAllPlayersXP {
    update_player(where: {}, _set: { seasonXP: 0, totalXP: 0, rank: null }) {
      affected_rows
    }
  }

  mutation UpsertProfile(
    $objects: [profile_insert_input!]!
    $updateColumns: [profile_update_column!]!
  ) {
    insert_profile(
      objects: $objects
      on_conflict: {
        constraint: profile_player_id_key
        update_columns: $updateColumns
      }
    ) {
      affected_rows
    }
  }

  mutation UpdatePlayer(
    $ethereumAddress: String!
    $rank: PlayerRank_enum
    $totalXP: numeric
    $seasonXP: numeric
    $discordId: String
  ) {
    update_player(
      where: { ethereumAddress: { _ilike: $ethereumAddress } }
      _set: {
        rank: $rank
        totalXP: $totalXP
        seasonXP: $seasonXP
        discordId: $discordId
      }
    ) {
      affected_rows
      returning {
        id
        ethereumAddress
        profile {
          username
        }
      }
    }
  }

  mutation InsertPlayers($objects: [player_insert_input!]!) {
    insert_player(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }

  mutation RemovePlayerAccount(
    $playerId: uuid!
    $accountType: AccountType_enum
  ) {
    delete_player_account(
      where: { playerId: { _eq: $playerId }, type: { _eq: $accountType } }
    ) {
      affected_rows
    }
  }
`;
