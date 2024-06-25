export const UpdatePlayerAddress = /* GraphQL */ `
  query UpdateAddress($ethereumAddress: String) {
    player(where: { ethereumAddress: { _ilike: $ethereumAddress } }) {
      id
    }
  }
`;
