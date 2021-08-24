import { gql } from 'graphql-request/dist';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetPlayer($playerId: uuid!) {
    player_by_pk(id: $playerId) {
      id
      ethereum_address
      discord_id
      Accounts {
        identifier
        type
      }
    }
  }

  query GetPlayerFromETH($ethereum_address: String) {
    player(where: { ethereum_address: { _eq: $ethereum_address } }) {
      id
    }
  }

  query GetPlayersByDiscordId($discordIds: [String!]) {
    player(where: { discord_id: { _in: $discordIds } }) {
      id
    }
  }

  query GetQuestById($quest_id: uuid!) {
    quest_by_pk(id: $quest_id) {
      id
      cooldown
      status
      repetition
      created_by_player_id
    }
  }

  query GetQuestCompletions($quest_id: uuid!, $player_id: uuid!) {
    quest_completion(
      where: {
        quest_id: { _eq: $quest_id }
        completed_by_player_id: { _eq: $player_id }
      }
    ) {
      id
      quest_id
      completed_by_player_id
    }
  }

  query GetQuestCompletionById($quest_completion_id: uuid!) {
    quest_completion_by_pk(id: $quest_completion_id) {
      id
      quest_id
      completed_by_player_id
      status
    }
  }

  query GetLastQuestCompletionForPlayer($quest_id: uuid!, $player_id: uuid!) {
    quest_completion(
      limit: 1
      order_by: { submitted_at: desc }
      where: {
        quest_id: { _eq: $quest_id }
        completed_by_player_id: { _eq: $player_id }
      }
    ) {
      id
      quest_id
      completed_by_player_id
      submitted_at
    }
  }
`;

export const GuildFragment = gql`
  fragment GuildFragment on guild {
    id
    guildname
    description
    join_button_url
    logo
    moloch_address
    name
    type
    website_url
    discord_id
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetGuild($guildname: String, $id: uuid, $discordId: String) {
    guild(
      where: {
        _or: [
          { id: { _eq: $id } }
          { guildname: { _eq: $guildname } }
          { discord_id: { _eq: $discordId } }
        ]
      }
    ) {
      ...GuildFragment
    }
  }
  ${GuildFragment}

  query GetGuildMetadataByDiscordId($discordId: String!) {
    guild_metadata(where: { discord_id: { _eq: $discordId } }) {
      guild_id
      creator_id
      discord_id
      discord_metadata
    }
  }

  query GetGuildMetadataById($id: uuid!) {
    guild_metadata(where: { guild_id: { _eq: $id } }) {
      guild_id
      creator_id
      discord_metadata
    }
  }

  query GetGuildMembers($id: uuid!) {
    guild(where: { id: { _eq: $id } }) {
      guild_players {
        Player {
          id
          discord_id
        }
      }
    }
  }
`;

export const GetCacheEntries = gql`
  query GetCacheEntries($updatedBefore: timestamptz!) {
    profile_cache(
      where: {
        _or: [
          { last_checked_at: { _lt: $updatedBefore } }
          { last_checked_at: { _is_null: true } }
        ]
      }
    ) {
      playerId
    }
  }
`;
