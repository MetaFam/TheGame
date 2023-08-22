export const UpsertDeworkUsername = /* GraphQL */ `
  mutation UpsertDeworkProfile($playerId: uuid!, $identifier: String!) {
    insert_player_account_one(
      object: { identifier: $identifier, playerId: $playerId, type: DEWORK }
      on_conflict: {
        constraint: player_account_type_player_id_key
        update_columns: identifier
      }
    ) {
      identifier
      playerId
      type
    }
  }
`;
