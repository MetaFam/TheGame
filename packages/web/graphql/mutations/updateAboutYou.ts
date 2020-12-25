import gql from 'fake-tag';

export const UpdateAboutYouMutation = gql`
  mutation UpdateAboutYou($playerId: uuid!, $input: Player_set_input!) {
    update_Player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      enneagram
      playerType {
        description
        id
        imageUrl
        title
      }
      id
    }
  }
`;
