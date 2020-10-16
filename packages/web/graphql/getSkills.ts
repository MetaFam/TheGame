import gql from 'fake-tag';
import { GetSkillsQuery, PlayerSkillFragment } from 'graphql/autogen/types';
import { client } from 'graphql/client';

const skillsQuery = gql`
  query GetSkills {
    Skill(
      order_by: { Player_Skills_aggregate: { count: desc }, category: asc }
    ) {
      ...PlayerSkill
    }
  }

  fragment PlayerSkill on Skill {
    id
    name
    category
  }
`;

export const getSkills = async (): Promise<PlayerSkillFragment[]> => {
  const { data, error } = await client
    .query<GetSkillsQuery>(skillsQuery)
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.Skill;
};
