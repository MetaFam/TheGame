export const UpsertDeworkUsername = /* GraphQL */ `
  mutation UpsertDeworkProfile(
    $playerId: uuid!,
    $identifier: String!,
    $type: String!
  ) {
    insert_player_account_one(object: {identifier: $identifier, playerId: $playerId, type: DEWORK}, on_conflict: {constraint: Account_identifier_type_key, update_columns: identifier}) {
      identifier
      playerId
      type
    }
  }
`