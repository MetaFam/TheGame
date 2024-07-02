import { gql } from 'graphql-request';

export const GetTokenBalances = gql`
  query GetTokenBalances($address: ID!) {
    account(id: $address) {
      id
      balances {
        amount
        token {
          symbol
        }
      }
    }
  }
`;

export const GetTopPSeedHoldersQuery = gql`
  query GetTopPSeedHolders($limit: Int) {
    tokenBalances(
      orderBy: amount
      orderDirection: desc
      where: {
        account_not_in: [
          "0x012546d756867d4a88cd3322bbb72d787e49ebf3"
          "0xba12222222228d8ba445958a75a0704d566bf2c8"
        ]
        token_: { id: "0x8a8fcd351ed553fc75aecbc566a32f94471f302e" }
      }
      first: $limit
    ) {
      amount
      token {
        name
        symbol
        id
      }
      account {
        id
      }
    }
  }
`;
