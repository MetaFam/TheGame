export const DaoQueries = /* GraphQL */ `
  query GetPlayerDaos($ethereumAddress: String) {
    dao_player(
      where: { Player: { ethereumAddress: { _eq: $ethereumAddress } } }
    ) {
      daoId
      playerId
      Dao {
        contractAddress
        network
      }
    }
  }

  query GetDaosByAddress($contractAddress: [String!]) {
    dao(where: { contractAddress: { _in: $contractAddress } }) {
      id
      contractAddress
      network
    }
  }
`;
