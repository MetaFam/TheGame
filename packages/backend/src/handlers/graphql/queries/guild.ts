export const GuildQueries = /* GraphQL */ `
  fragment GuildFragment on guild {
    id
    guildname
    description
    joinButtonUrl
    logo
    name
    type
    websiteUrl
    discordId
    status
    membershipThroughDiscord
  }

  query GetGuild($id: uuid!) {
    guild(where: { id: { _eq: $id } }) {
      ...GuildFragment
      daos {
        id
        guildId
        contractAddress
        network
        label
        url
        players {
          playerId
          visible
        }
      }
    }
  }

  query GetGuildMetadataByDiscordId($discordId: String!) {
    guild(where: { discordId: { _eq: $discordId } }) {
      id
      discordId
      guildname
      metadata {
        guildId
        creatorId
        discordMetadata
      }
    }
  }

  query GetGuilds($status: GuildStatus_enum) {
    guild(where: { status: { _eq: $status } }) {
      ...GuildFragment
    }
  }

  query GetGuildMetadataById($id: uuid!) {
    guild_metadata(where: { guildId: { _eq: $id } }) {
      guildId
      creatorId
      discordId
      discordMetadata
    }
  }

  query GetGuildMembers($id: uuid!) {
    guild(where: { id: { _eq: $id } }) {
      id
      guild_players {
        Player {
          id
          discordId
        }
      }
    }
  }

  query GetGuildPlayerDiscordIds($guildId: uuid!, $playerId: uuid!) {
    guild_player(
      where: {
        _and: { guildId: { _eq: $guildId }, playerId: { _eq: $playerId } }
      }
    ) {
      Player {
        id
        discordId
      }
      Guild {
        id
        discordId
      }
    }
  }
`;
