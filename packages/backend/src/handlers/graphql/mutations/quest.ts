export const QuestMutations = /* GraphQL */ `
  mutation CreateQuest($objects: [quest_insert_input!]!) {
    insert_quest(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }
  mutation CreateQuestCompletion($objects: [quest_completion_insert_input!]!) {
    insert_quest_completion(objects: $objects) {
      affected_rows
      returning {
        id
        questId
        completedByPlayerId
      }
    }
  }

  mutation UpdateQuestStatus($quest_id: uuid!, $status: QuestStatus_enum!) {
    update_quest_by_pk(
      pk_columns: { id: $quest_id }
      _set: { status: $status }
    ) {
      id
    }
  }

  mutation UpdateQuestCompletionStatus(
    $quest_completion_id: uuid!
    $status: QuestCompletionStatus_enum!
  ) {
    update_quest_completion_by_pk(
      pk_columns: { id: $quest_completion_id }
      _set: { status: $status }
    ) {
      id
    }
  }

  mutation RejectOtherQuestCompletions(
    $accepted_quest_completion_id: uuid!
    $questId: uuid!
  ) {
    update_quest_completion(
      where: {
        _and: [
          { id: { _neq: $accepted_quest_completion_id } }
          { questId: { _eq: $questId } }
        ]
      }
      _set: { status: REJECTED }
    ) {
      affected_rows
    }
  }
`;
