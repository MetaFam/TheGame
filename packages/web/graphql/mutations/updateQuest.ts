import gql from 'fake-tag';

export const UpdateQuestMutation = gql`
  mutation UpdateQuest($id: uuid!, $input: quest_set_input!) {
      update_quest_by_pk(
        pk_columns: {id: $id}, 
        _set: $input
      ) {
        id
      }
  }
`;
