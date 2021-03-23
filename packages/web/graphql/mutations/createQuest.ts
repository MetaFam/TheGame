import gql from 'fake-tag';

export const CreateQuestMutation = gql`
  mutation CreateQuest($input: CreateQuestInput!) {
    createQuest(quest: $input) {
      error
      quest_id
    }
  }
`;
