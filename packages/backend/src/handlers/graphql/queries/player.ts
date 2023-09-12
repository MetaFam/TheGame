export const PlayerQueries = /* GraphQL */ `
  query GetPlayersByTotalXP {
    xp(
      where: {
        tokenAddress: { _ilike: "0xEAeCC18198a475c921B24b8A6c1C1f0f5F3F7EA0" }
        balance: { _gt: "0" }
      }
      order_by: { balance: desc }
    ) {
      playerId
      seasonalBalance
      balance
    }
  }

  query GetPlayer($playerId: uuid!) {
    player_by_pk(id: $playerId) {
      id
      ceramicProfileId
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
