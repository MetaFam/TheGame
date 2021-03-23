import gql from 'fake-tag';

export const UpdateQuestCompletionMutation = gql`
  mutation UpdateQuestCompletion($quest_completion_id: String!, $status: QuestCompletionStatus_ActionEnum!) {
    updateQuestCompletion(updateData: {
      quest_completion_id: $quest_completion_id, 
      status: $status
    }) {
      error
      success
    }
  }
`;
