export const InsertCacheInvalidation = /* GraphQL */ `
  mutation InsertCacheInvalidation($playerId: uuid!) {
    updateIDXProfile(playerId: $playerId) {
      success
    }
  }
`;
