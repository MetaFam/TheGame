import { gql } from 'graphql-request/dist';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  mutation CreatePlayerFromETH($ethereum_address: String!, $username: String!) {
    insert_player(
      objects: { username: $username, ethereum_address: $ethereum_address }
    ) {
      affected_rows
      returning {
        id
        username
        ethereum_address
      }
    }
  }

  mutation UpsertAccount(
    $objects: [player_account_insert_input!]!
    $on_conflict: player_account_on_conflict = {
      constraint: Account_identifier_type_key
      update_columns: []
    }
  ) {
    insert_player_account(objects: $objects, on_conflict: $on_conflict) {
      affected_rows
    }
  }

  mutation UpsertProfileCache(
    $objects: [profile_cache_insert_input!]!
    $onConflict: profile_cache_on_conflict = {
      constraint: profile_cache_player_id_key
      update_columns: [
        name
        description
        emoji
        imageURL
        backgroundImageURL
        gender
        location
        country
        website
      ]
    }
  ) {
    insert_profile_cache(on_conflict: $onConflict, objects: $objects) {
      affected_rows
    }
  }

  mutation UpdatePlayer(
    $ethAddress: String
    $rank: PlayerRank_enum
    $totalXp: numeric
    $seasonXp: numeric
    $discordId: String
  ) {
    update_player(
      where: { ethereum_address: { _eq: $ethAddress } }
      _set: {
        ethereum_address: $ethAddress
        rank: $rank
        total_xp: $totalXp
        season_xp: $seasonXp
        discord_id: $discordId
      }
    ) {
      affected_rows
      returning {
        id
        ethereum_address
        username
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

  mutation CreateQuest($objects: [quest_insert_input!]!) {
    insert_quest(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const CreateQuestCompletion = gql`
  mutation CreateQuestCompletion($objects: [quest_completion_insert_input!]!) {
    insert_quest_completion(objects: $objects) {
      affected_rows
      returning {
        id
        quest_id
        completed_by_player_id
      }
    }
  }

  mutation UpdateQuestStatus($quest_id: uuid!, $status: QuestStatus_enum!) {
    update_quest_by_pk(
      pk_columns: { id: $quest_id }
      _set: { status: $status }
    ) {
      id
    }
  }

  mutation UpdateQuestCompletionStatus(
    $quest_completion_id: uuid!
    $status: QuestCompletionStatus_enum!
  ) {
    update_quest_completion_by_pk(
      pk_columns: { id: $quest_completion_id }
      _set: { status: $status }
    ) {
      id
    }
  }

  mutation RejectOtherQuestCompletions(
    $accepted_quest_completion_id: uuid!
    $quest_id: uuid!
  ) {
    update_quest_completion(
      where: {
        _and: [
          { id: { _neq: $accepted_quest_completion_id } }
          { quest_id: { _eq: $quest_id } }
        ]
      }
      _set: { status: REJECTED }
    ) {
      affected_rows
    }
  }

  mutation CreateGuild($object: guild_insert_input!) {
    insert_guild_one(object: $object) {
      guildname
      id
    }
  }

  mutation UpdateGuild($guildId: uuid!, $object: guild_set_input!) {
    update_guild_by_pk(pk_columns: { id: $guildId }, _set: $object) {
      id
    }
  }

  mutation CreateGuildMetadata($object: guild_metadata_insert_input!) {
    insert_guild_metadata_one(object: $object) {
      creator_id
      discord_id
      guild_id
      discord_metadata
    }
  }

  mutation UpdateGuildDiscordMetadata(
    $guildId: uuid!
    $discordMetadata: jsonb
  ) {
    update_guild_metadata_by_pk(
      pk_columns: { guild_id: $guildId }
      _set: { discord_metadata: $discordMetadata }
    ) {
      guild_id
    }
  }

  mutation SyncGuildMembers(
    $memberDiscordIdsToRemove: [String!]!
    $membersToAdd: [guild_player_insert_input!]!
  ) {
    delete_guild_player(
      where: { Player: { discord_id: { _in: $memberDiscordIdsToRemove } } }
    ) {
      affected_rows
    }
    insert_guild_player(objects: $membersToAdd) {
      affected_rows
    }
  }
`;
