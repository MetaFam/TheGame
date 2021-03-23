import gql from 'fake-tag';

export const CreateQuestCompletionMutation = gql`
  mutation CreateQuestCompletion($input: CreateQuestCompletionInput!) {
    createQuestCompletion(questCompletion: $input) {
      success
      error
      quest_completion_id
    }
  }
`;
