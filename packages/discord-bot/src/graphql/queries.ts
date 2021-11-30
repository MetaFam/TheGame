import { gql } from 'graphql-request/dist';

export const GetPlayer = gql`
  query GetPlayer($playerId: uuid!) {
    player_by_pk(id: $playerId) {
      id
      ethereumAddress
    }
  }
`;

export const GetPlayerFromEth = gql`
  query GetPlayerFromETH($ethereumAddress: String) {
    player(where: { ethereumAddress: { _eq: $ethereumAddress } }) {
      id
    }
  }
`;
