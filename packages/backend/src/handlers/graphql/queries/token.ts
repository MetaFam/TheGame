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

  query GetTotalForPlayer(
    $playerAddress: String!
    $tokenAddress: String!
    $executedAfter: timestamptz
  ) {
    balance_aggregate(
      where: {
        tokenAddress: { _ilike: $tokenAddress }
        playerAddress: { _ilike: $playerAddress }
        executedAt: { _gte: $executedAfter }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }

  query GetInitialXP($playerId: uuid!) {
    xp(where: { playerId: { _eq: $playerId } }) {
      initial
    }
  }
`;
