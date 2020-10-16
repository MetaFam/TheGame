import gql from 'fake-tag';

export const UpdateSkillsMutation = gql`
  mutation UpdatePlayerSkills(
    $availability_hours: Int!
    $skills: [Player_Skill_insert_input!]!
  ) {
    delete_Player_Skill(where: {}) {
      affected_rows
    }
    insert_Player_Skill(objects: $skills) {
      affected_rows
    }
    update_Player(
      _set: { availability_hours: $availability_hours }
      where: {}
    ) {
      returning {
        id
        availability_hours
        Player_Skills {
          Skill {
            id
            category
            name
          }
        }
      }
    }
  }
`;
