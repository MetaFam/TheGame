export const GetPlayer = /* GraphQL */ `
  query GetPlayer($playerId: uuid!) {
    player_by_pk(id: $playerId) {
      id
      ethereumAddress
    }
  }
`;

export const GetPlayerFromEth = /* GraphQL */ `
  query GetPlayerFromETH($ethereumAddress: String) {
    player(where: { ethereumAddress: { _ilike: $ethereumAddress } }) {
      id
    }
  }
`;
