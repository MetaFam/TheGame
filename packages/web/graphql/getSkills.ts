import gql from 'fake-tag';
import { GetSkillsQuery } from 'graphql/autogen/types';
import { client } from 'graphql/client';
import { Skill } from 'graphql/types';

const skillsQuery = gql`
  query GetSkills {
    Skill(
      order_by: { Player_Skills_aggregate: { count: desc }, category: asc }
    ) {
      id
      name
      category
    }
  }
`;

export const getSkills = async (): Promise<Skill[]> => {
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
