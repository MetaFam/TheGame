import { gql } from 'graphql-request/dist';

export const GetPlayer = gql`
  query GetPlayer($playerId: uuid!) {
    Player_by_pk(id: $playerId) {
      id
      ethereum_address
    }
  }
`;

export const GetPlayerFromEth = gql`
  query GetPlayerFromETH($ethereum_address: String) {
    Player(where: { ethereum_address: { _eq: $ethereum_address } }) {
      id
    }
  }
`;
