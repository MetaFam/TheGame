export const TokenMutations = /* GraphQL */ `
  mutation AddBalance (
    $amount: float8!
    $blockHeight: Int!
    $playerAddress: String!
    $tokenAddress: String!
  ) {
    insert_balance_one(object: {
      amount: $amount,
      blockHeight: $blockHeight,
      playerAddress: $playerAddress,
      tokenAddress: $tokenAddress,
    }) {
      id
    }
  }

  mutation UpdateLastOffset  (
    $tokenAddress: String!
    $offset: Int!
  ) {
    update_token(where: {address: {_eq: $tokenAddress}}, _set: {lastOffset: $offset}) {
      returning {
        lastOffset
      }
    }
  }
`