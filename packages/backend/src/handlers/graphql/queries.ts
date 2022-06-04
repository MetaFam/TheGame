/* eslint-disable @typescript-eslint/no-unused-expressions */

/* GraphQL */ `
  query GetPlayer($playerId: uuid!) {
    player_by_pk(id: $playerId) {
      id
      ethereumAddress
      discordId
      profile {
        username
      }
      accounts {
        identifier
        type
      }
    }
  }

  query GetPlayerFromETH($ethereumAddress: String) {
    player(where: { ethereumAddress: { _eq: $ethereumAddress } }) {
      id
    }
  }

  query GetPlayersByDiscordId($discordIds: [String!]!) {
    player(where: { discordId: { _in: $discordIds } }) {
      id
    }
  }

  query GetQuestById($questId: uuid!) {
    quest_by_pk(id: $questId) {
      id
      cooldown
      status
      repetition
      createdByPlayerId
      title
    }
  }

  query GetQuestCompletions($questId: uuid!, $playerId: uuid!) {
    quest_completion(
      where: {
        questId: { _eq: $questId }
        completedByPlayerId: { _eq: $playerId }
      }
    ) {
      id
      questId
      completedByPlayerId
    }
  }

  query GetQuestCompletionById($quest_completion_id: uuid!) {
    quest_completion_by_pk(id: $quest_completion_id) {
      id
      questId
      completedByPlayerId
      status
    }
  }

  query GetLastQuestCompletionForPlayer($questId: uuid!, $playerId: uuid!) {
    quest_completion(
      limit: 1
      order_by: { submittedAt: desc }
      where: {
        questId: { _eq: $questId }
        completedByPlayerId: { _eq: $playerId }
      }
    ) {
      id
      questId
      completedByPlayerId
      submittedAt
    }
  }
`;

export const GuildFragment = /* GraphQL */ `
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
`;

/* GraphQL */ `
  query GetGuild($id: uuid!) {
    guild(where: { id: { _eq: $id } }) {
      ...GuildFragment,
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
  ${GuildFragment}

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

export const GetCacheEntries = /* GraphQL */ `
  query GetCacheEntries($updatedBefore: timestamptz!) {
    profile(
      where: {
        _or: [
          { lastCheckedAt: { _lt: $updatedBefore } }
          { lastCheckedAt: { _is_null: true } }
        ]
      }
    ) {
      playerId
    }
  }
`;
