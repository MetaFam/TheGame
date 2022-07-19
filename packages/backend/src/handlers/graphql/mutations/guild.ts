export const GuildMutations = /* GraphQL */ `
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
      creatorId
      discordId
      guildId
      discordMetadata
    }
  }

  mutation UpdateGuildDiscordMetadata(
    $guildId: uuid!
    $discordMetadata: jsonb
  ) {
    update_guild_metadata_by_pk(
      pk_columns: { guildId: $guildId }
      _set: { discordMetadata: $discordMetadata }
    ) {
      guildId
    }
  }

  mutation SyncGuildMembers(
    $memberDiscordIdsToRemove: [String!]!
    $membersToAdd: [guild_player_insert_input!]!
  ) {
    delete_guild_player(
      where: { Player: { discordId: { _in: $memberDiscordIdsToRemove } } }
    ) {
      affected_rows
    }
    insert_guild_player(objects: $membersToAdd) {
      affected_rows
    }
  }

  mutation RemoveAllGuildMembers($guildId: uuid!) {
    delete_guild_player(where: { guildId: { _eq: $guildId } }) {
      affected_rows
    }
  }
`;
