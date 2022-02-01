export const CreateQuestCompletionMutation = /* GraphQL */ `
  mutation CreateQuestCompletion($input: CreateQuestCompletionInput!) {
    createQuestCompletion(questCompletion: $input) {
      success
      error
      quest_completion_id
      quest_completion {
        id # We add this for urql to update the cache
        quest {
          id
        }
      }
    }
  }
`;
