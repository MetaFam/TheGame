import gql from 'fake-tag';

import { GetQuestQuery, GetQuestQueryVariables } from './autogen/types';
import { client } from './client';
import { QuestFragment } from './fragments';

const questQuery = gql`
  query GetQuest($id: uuid!) {
    quest_by_pk(id: $id) {
      ...QuestFragment
    }
  }
  ${QuestFragment}
`;

export const getQuest = async (id: string | undefined) => {
  if (!id) return null;
  const { data } = await client
    .query<GetQuestQuery, GetQuestQueryVariables>(questQuery, { id })
    .toPromise();

  return data?.quest_by_pk;
};
