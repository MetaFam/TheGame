import { gql } from 'graphql-request/dist';

export const CreatePlayerFromETH = gql`
  mutation CreatePlayerFromETH($ethereum_address: String!, $username: String!) {
    insert_Player(
      objects: { username: $username, ethereum_address: $ethereum_address }
    ) {
      affected_rows
      returning {
        id
        username
        ethereum_address
      }
    }
  }
`;

export const UpsertAccount = gql`
  mutation UpsertAccount(
    $objects: [Account_insert_input!]!
    $on_conflict: Account_on_conflict = {
      constraint: Account_identifier_type_key
      update_columns: []
    }
  ) {
    insert_Account(objects: $objects, on_conflict: $on_conflict) {
      affected_rows
    }
  }
`;

export const UpsertPlayer = gql`
  mutation UpsertPlayer(
    $objects: [Player_insert_input!]!
    $onConflict: Player_on_conflict
  ) {
    insert_Player(on_conflict: $onConflict, objects: $objects) {
      affected_rows
    }
  }
`;

export const UpdatePlayer = gql`
  mutation UpdatePlayer(
    $ethAddress: String
    $identityId: String
    $username: String
    $rank: Player_Rank_enum
    $totalXp: numeric
    $discordId: String
  ) {
    update_Player(
      where: {
        _or: [
          {
            ethereum_address: { _eq: $ethAddress }
            scIdentityId: { _eq: $identityId }
          }
          {
            ethereum_address: { _eq: $ethAddress }
            username: { _eq: $username }
          }
          { scIdentityId: { _eq: $identityId } }
          {
            Accounts: {
              _and: { type: { _eq: DISCORD }, identifier: { _eq: $discordId } }
            }
          }
        ]
      }
      _set: {
        ethereum_address: $ethAddress
        scIdentityId: $identityId
        username: $username
        rank: $rank
        totalXp: $totalXp
      }
    ) {
      affected_rows
      returning {
        id
        ethereum_address
        scIdentityId
        username
      }
    }
  }
`;
