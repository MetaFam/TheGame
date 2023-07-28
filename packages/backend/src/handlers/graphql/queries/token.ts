export const TokenQueries = /* GraphQL */ `
  query GetGuildToken($guildId: uuid!) {
    token(where: { guild_id: { _eq: $guildId } }) {
      address
      chain_id
    }
  }
`;
