import { gql } from 'graphql-request/dist';

export const GetTokenBalances = gql`
  query GetTokenBalances($address: ID!) {
    userToken(id: $address) {
      id
      seedBalance
      pSeedBalance
    }
  }
`;

export const GetTopPSeedHoldersQuery = gql`
  query GetTopPSeedHolders($limit: Int) {
    userTokens(
      orderBy: pSeedBalance
      orderDirection: desc
      where: {
        pSeedBalance_gt: "0"
        # filter out this contract address
        address_neq: "0xbaf60086da36033b458b892e2432958e219f4ed6"
      }
      first: $limit
    ) {
      id
      seedBalance
      pSeedBalance
    }
  }
`;
