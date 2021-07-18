import gql from 'fake-tag';

export const InsertCacheInvalidation = gql`
  mutation InsertCacheInvalidation($playerId: uuid!) {
    updateIDXProfile(playerId: $playerId) {
      success
      error
    }
  }
`;
