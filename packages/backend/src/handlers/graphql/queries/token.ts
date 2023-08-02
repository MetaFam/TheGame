export const TokenQueries = /* GraphQL */ `
  query GetGuildToken($guildId: uuid!) {
    token(where: { guildId: { _eq: $guildId } }) {
      address
      chainId
    }
  }

  query GetTokens {
    token {
      address
      chainId
      safeAddress
      lastOffset
      guildId
    }
  }
`;
