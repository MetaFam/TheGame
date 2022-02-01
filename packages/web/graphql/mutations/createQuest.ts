export const CreateQuestMutation = /* GraphQL */ `
  mutation CreateQuest($input: CreateQuestInput!) {
    createQuest(quest: $input) {
      success
      error
      quest_id
      quest {
        id # We add this for urql to update the cache
      }
    }
  }
`;
