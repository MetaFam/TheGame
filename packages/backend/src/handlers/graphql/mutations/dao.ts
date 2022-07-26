export const DaoMutations = /* GraphQL */ `
  mutation UpdateDao($daoId: uuid!, $object: dao_set_input!) {
    update_dao_by_pk(pk_columns: { id: $daoId }, _set: $object) {
      id
    }
  }

  mutation DetachDaosFromGuild($ids: [uuid!]!) {
    update_dao(where: { id: { _in: $ids } }, _set: { guildId: null }) {
      affected_rows
    }
  }

  mutation DeleteDaos($ids: [uuid!]!) {
    delete_dao(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }

  mutation InsertDaos($objects: [dao_insert_input!]!) {
    insert_dao(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation SyncDaoMembers(
    $memberEthIdsToRemove: [String!]!
    $membersToAdd: [dao_player_insert_input!]!
  ) {
    delete_dao_player(
      where: { Player: { ethereumAddress: { _in: $memberEthIdsToRemove } } }
    ) {
      affected_rows
    }
    insert_dao_player(objects: $membersToAdd) {
      affected_rows
    }
  }

  mutation RemovePlayerFromDaos($playerEthAdress: String!, $daoIds: [uuid!]!) {
    delete_dao_player(
      where: {
        Player: { ethereumAddress: { _eq: $playerEthAdress } }
        _and: { daoId: { _in: $daoIds } }
      }
    ) {
      affected_rows
    }
  }

  mutation UpsertDaoMembers($objects: [dao_player_insert_input!]!) {
    insert_dao_player(
      objects: $objects
      on_conflict: { constraint: dao_player_pkey, update_columns: [] }
    ) {
      affected_rows
    }
  }
`;
