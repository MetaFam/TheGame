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

  query GetTotalForPlayer($playerAddress: String!, $tokenAddress: String!) {
    balance_aggregate(where: {tokenAddress: {_ilike: $tokenAddress}, playerAddress: {_ilike: $playerAddress}}) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;
