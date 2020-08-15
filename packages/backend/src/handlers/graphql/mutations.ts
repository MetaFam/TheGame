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
  mutation UpsertAccount($objects: [Account_insert_input!]!) {
    insert_Account(
      objects: $objects
      on_conflict: {
        constraint: Account_identifier_type_player_key
        update_columns: [identifier]
      }
    ) {
      affected_rows
    }
  }
`;
