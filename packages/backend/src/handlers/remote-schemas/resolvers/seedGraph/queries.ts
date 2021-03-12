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
