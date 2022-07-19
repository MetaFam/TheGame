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
      affected_rows
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
`;
