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
    join_button_url
    logo
    name
    type
    website_url
    discord_id
    status
    membership_through_discord
  }
`;

/* GraphQL */ `
  query GetGuild($id: uuid!) {
    guild(where: { id: { _eq: $id } }) {
      ...GuildFragment,
      daos { 
        id
        contractAddress
        network
        label
        url
      }
    }
  }
  ${GuildFragment}

  query GetGuildMetadataByDiscordId($discordId: String!) {
    guild(where: { discord_id: { _eq: $discordId } }) {
      id
      discord_id
      guildname
      metadata {
        guild_id
        creator_id
        discord_metadata
      }
    }
  }

  query GetGuilds($status: GuildStatus_enum) {
    guild(where: { status: { _eq: $status } }) {
      ...GuildFragment
    }
  }

  query GetGuildMetadataById($id: uuid!) {
    guild_metadata(where: { guild_id: { _eq: $id } }) {
      guild_id
      creator_id
      discord_id
      discord_metadata
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
        _and: { guild_id: { _eq: $guildId }, player_id: { _eq: $playerId } }
      }
    ) {
      Player {
        id
        discordId
      }
      Guild {
        id
        discord_id
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
