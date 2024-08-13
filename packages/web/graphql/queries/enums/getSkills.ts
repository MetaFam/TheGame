import {
  GetSkillsQuery,
  PlayerSkillFragment as PlayerSkillFragmentType,
} from 'graphql/autogen/hasura-sdk';

import { client } from '#graphql/client';
import { PlayerSkillFragment } from '#graphql/fragments';

const skillsQuery = /* GraphQL */ `
  query GetSkills {
    skill(
      order_by: { Player_Skills_aggregate: { count: desc }, category: asc }
    ) {
      ...PlayerSkillFragment
    }
  }
  ${PlayerSkillFragment}
`;

export const getSkills = async (): Promise<PlayerSkillFragmentType[]> => {
  const { data, error } = await client
    .query<GetSkillsQuery>(skillsQuery, {})
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }
    return [];
  }

  return data.skill;
};
