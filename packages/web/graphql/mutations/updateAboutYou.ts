import gql from 'fake-tag';

export const UpdateAboutYouMutation = gql`
  mutation UpdateAboutYou($playerId: uuid!, $input: player_set_input!) {
    update_player_by_pk(pk_columns: { id: $playerId }, _set: $input) {
      color_mask
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
