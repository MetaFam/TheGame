import gql from 'fake-tag';

export const UpdateSkillsMutation = gql`
  mutation UpdatePlayerSkills(
    $skills: [Player_Skill_insert_input!]!
  ) {
    delete_Player_Skill(where: {}) {
      affected_rows
    }
    insert_Player_Skill(objects: $skills) {
      affected_rows
    }
  }
`;
