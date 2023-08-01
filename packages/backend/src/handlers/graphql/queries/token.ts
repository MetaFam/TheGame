export const TokenQueries = /* GraphQL */ `
  query GetGuildToken($guildId: uuid!) {
    token(where: { guild_id: { _eq: $guildId } }) {
      address
      chain_id
    }
  }

  query GetTokens {
    token {
      address
      chain_id
      safe_address
    }
  }
`;
