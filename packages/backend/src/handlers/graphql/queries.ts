import { gql } from 'graphql-request/dist';

export const GetPlayer = gql`
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
`;

export const GetPlayerFromEth = gql`
  query GetPlayerFromETH($ethereum_address: String) {
    player(where: { ethereum_address: { _eq: $ethereum_address } }) {
      id
    }
  }
`;

export const GetQuestById = gql`
  query GetQuestById($quest_id: uuid!) {
    quest_by_pk(id: $quest_id) {
      id
      cooldown
      status
      repetition
      created_by_player_id
    }
  }
`;

export const GetQuestCompletions = gql`
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
`;

export const GetQuestCompletionById = gql`
  query GetQuestCompletionById($quest_completion_id: uuid!) {
    quest_completion_by_pk(id: $quest_completion_id) {
      id
      quest_id
      completed_by_player_id
      status
    }
  }
`;

export const GetLastQuestCompletionForPlayer = gql`
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
    discord_metadata
  }
`;

export const GetGuild = gql`
  query GetGuild($guildname: String!) {
    guild(where: { guildname: { _eq: $guildname } }) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const GetDiscordGuild = gql`
  query GetDiscordGuild($discordId: String!) {
    guild(where: { discord_id: { _eq: $discordId } }) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
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
