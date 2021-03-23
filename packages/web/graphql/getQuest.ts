import gql from 'fake-tag';

import { GetQuestQuery, GetQuestWithCompletionsQuery, GetQuestQueryVariables, GetQuestWithCompletionsQueryVariables } from './autogen/types';
import { client } from './client';
import { QuestFragment, QuestCompletionFragment } from './fragments';

const questQuery = gql`
  query GetQuest($id: uuid!) {
    quest_by_pk(id: $id) {
      ...QuestFragment
      player {
        id
        ethereum_address
      }
    }
  }
  ${QuestFragment}
`;

const questWithCompletionsQuery = gql`
  query GetQuestWithCompletions($id: uuid!) {
    quest_by_pk(id: $id) {
      ...QuestFragment
      player {
        id
        ethereum_address
      }
      quest_completions {
        ...QuestCompletionFragment
        player {
          id
          ethereum_address
        }
      }
    }
  }
  ${QuestFragment}
  ${QuestCompletionFragment}
`;

export const getQuest = async (id: string | undefined) => {
  if (!id) return null;
  const { data } = await client
    .query<GetQuestQuery, GetQuestQueryVariables>(questQuery, { id })
    .toPromise();

  return data?.quest_by_pk;
};

export const getQuestWithCompletions = async (id: string | undefined) => {
  if (!id) return null;
  const { data } = await client
    .query<GetQuestWithCompletionsQuery, GetQuestWithCompletionsQueryVariables>(questWithCompletionsQuery, { id })
    .toPromise();

  return data?.quest_by_pk;
};
