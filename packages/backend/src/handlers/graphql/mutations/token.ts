export const TokenMutations = /* GraphQL */ `
  mutation AddBalance(
    $amount: float8!
    $executedAt: timestamptz!
    $playerAddress: String!
    $tokenAddress: String!
  ) {
    insert_balance_one(
      object: {
        amount: $amount
        executedAt: $executedAt
        playerAddress: $playerAddress
        tokenAddress: $tokenAddress
      }
    ) {
      id
    }
  }

  mutation UpdateLastBlockHeight($tokenAddress: String!, $height: Int!) {
    update_token(
      where: { address: { _eq: $tokenAddress } }
      _set: { lastBlockHeight: $height }
    ) {
      returning {
        lastBlockHeight
      }
    }
  }

  mutation UpsertXP(
    $balance: float8!
    $playerId: uuid!
    $tokenAddress: String!
    $seasonalBalance: float8!
  ) {
    insert_xp(
      objects: {
        balance: $balance
        playerId: $playerId
        tokenAddress: $tokenAddress
        seasonalBalance: $seasonalBalance
      }
      on_conflict: {
        update_columns: [balance, seasonalBalance]
        constraint: xp_player_id_token_address_key
      }
    ) {
      returning {
        balance
        tokenAddress
        playerId
        id
      }
    }
  }
`;
