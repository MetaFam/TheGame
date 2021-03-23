import gql from 'fake-tag';

import { GetQuestsQuery, GetQuestsQueryVariables } from './autogen/types';
import { client } from './client';
import { QuestFragment } from './fragments';

const questsQuery = gql`
  query GetQuests($limit: Int) {
    quest(limit: $limit) {
      ...QuestFragment
    }
  }

  ${QuestFragment}
`;

export const getQuests = async (limit = 50) => {
  const { data, error } = await client
    .query<GetQuestsQuery, GetQuestsQueryVariables>(questsQuery, { limit })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.quest;
};
