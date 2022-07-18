import {
  GetQuestDocument,
  GetQuestQuery,
  GetQuestQueryVariables,
  GetQuestWithCompletionsDocument,
  GetQuestWithCompletionsQuery,
  GetQuestWithCompletionsQueryVariables,
} from 'graphql/autogen/types';
import { client as defaultClient } from 'graphql/client';
import {
  PlayerFragment,
  QuestFragment,
  QuestWithCompletionFragment,
} from 'graphql/fragments';
import { Client } from 'urql';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  query GetQuest($id: uuid!) {
    quest_by_pk(id: $id) {
      ...QuestFragment
    }
  }
  ${QuestFragment}
`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  query GetQuestWithCompletions(
    $id: uuid!
  ) {
    quest_by_pk(id: $id) {
      ...QuestWithCompletionFragment
      player {
        ...PlayerFragment
      }
    }
  }
  ${QuestWithCompletionFragment}
  ${PlayerFragment}
`;

export const getQuest = async (
  id: string | undefined,
  client: Client = defaultClient,
) => {
  if (!id) return null;
  const { data } = await client
    .query<GetQuestQuery, GetQuestQueryVariables>(GetQuestDocument, { id })
    .toPromise();

  return data?.quest_by_pk;
};

export const getQuestWithCompletions = async (
  id: string | undefined,
  client: Client = defaultClient,
) => {
  if (!id) return null;
  const { data } = await client
    .query<GetQuestWithCompletionsQuery, GetQuestWithCompletionsQueryVariables>(
      GetQuestWithCompletionsDocument,
      { id },
    )
    .toPromise();

  return data?.quest_by_pk;
};
