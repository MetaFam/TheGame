import gql from 'fake-tag';
import { Client } from 'urql';

import { GetQuestQuery, GetQuestQueryVariables, GetQuestWithCompletionsQuery, GetQuestWithCompletionsQueryVariables, GetQuestWithCompletionsDocument } from './autogen/types';
import { client as defaultClient } from './client';
import { QuestCompletionFragment,QuestFragment } from './fragments';

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

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetQuestWithCompletions($id: uuid!) {
    quest_by_pk(id: $id) {
      ...QuestFragment
      player {
        id
        ethereum_address
      }
      quest_skills {
        skill {
          name
          category
        }
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

export const getQuest = async (id: string | undefined, client: Client = defaultClient) => {
  if (!id) return null;
  const { data } = await client
    .query<GetQuestQuery, GetQuestQueryVariables>(questQuery, { id })
    .toPromise();

  return data?.quest_by_pk;
};

export const getQuestWithCompletions = async (id: string, client: Client = defaultClient) => {
  if (!id) return null;
  const { data } = await client
    .query<GetQuestWithCompletionsQuery, GetQuestWithCompletionsQueryVariables>(
      GetQuestWithCompletionsDocument,
      { id },
    )
    .toPromise();

  return data?.quest_by_pk;
};
