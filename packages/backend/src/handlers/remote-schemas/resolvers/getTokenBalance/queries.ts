import { gql } from 'graphql-request/dist';

export const GetTokenBalance = gql`
  query GetTokenBalance($address: ID!) {
    userToken(id: $address) {
      id
      seedBalance
      pSeedBalance
    }
  }
`;
