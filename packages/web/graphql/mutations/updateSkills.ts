import gql from 'fake-tag';

export const UpdateSkillsMutation = gql`
  mutation UpdatePlayerSkills(
    $skills: [player_skill_insert_input!]!
  ) {
    delete_player_skill(where: {}) {
      affected_rows
    }
    insert_player_skill(objects: $skills) {
      affected_rows
    }
  }
`;
