export const InsertCacheInvalidation = /* GraphQL */ `
  mutation InsertCacheInvalidation($playerId: uuid!) {
    updateCachedProfile(playerId: $playerId)
  }
`;
