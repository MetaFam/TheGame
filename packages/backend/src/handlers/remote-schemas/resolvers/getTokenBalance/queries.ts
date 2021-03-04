import { gql } from 'graphql-request/dist';

export const GetTokenBalance = gql`
  query GetTokenBalance($address: String!) {
    userTokens(where: { address: $address }) {
      id
      seedBalance
      pSeedBalance
    }
  }
`;
