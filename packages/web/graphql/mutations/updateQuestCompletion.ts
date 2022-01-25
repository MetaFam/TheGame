import gql from 'fake-tag';

export const UpdateQuestCompletionMutation = gql`
  mutation UpdateQuestCompletion(
    $questCompletionId: String!
    $status: QuestCompletionStatus_ActionEnum!
  ) {
    updateQuestCompletion(
      updateData: { questCompletionId: $questCompletionId, status: $status }
    ) {
      error
      success
      quest_completion_id
      quest_completion {
        id # We add this for urql to update the cache
      }
    }
  }
`;
