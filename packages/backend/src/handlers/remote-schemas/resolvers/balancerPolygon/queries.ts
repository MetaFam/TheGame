export const GetPoolTokenData = /* GraphQL */ `
  query GetPoolTokenData($address: Bytes!) {
    pools(where: { address: $address }) {
      id
      totalShares
      tokens {
        id
        symbol
        balance
        token {
          id
          symbol
          latestUSDPrice
        }
      }
    }
  }
`;
