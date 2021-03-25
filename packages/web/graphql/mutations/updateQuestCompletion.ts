import gql from 'fake-tag';

export const UpdateQuestCompletionMutation = gql`
  mutation UpdateQuestCompletion($quest_completion_id: String!, $status: QuestCompletionStatus_ActionEnum!) {
    updateQuestCompletion(updateData: {
      quest_completion_id: $quest_completion_id, 
      status: $status
    }) {
      error
      success
      quest_completion_id
      quest_completion {
        id # We add this for urql to update the cache
      }
    }
  }
`;
