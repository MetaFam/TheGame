import gql from 'fake-tag';

export const CreateQuestMutation = gql`
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
