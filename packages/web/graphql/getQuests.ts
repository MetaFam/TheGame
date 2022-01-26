import gql from 'fake-tag';
import { Client } from 'urql';

import {
  GetAcceptedQuestsByPlayerDocument,
  GetAcceptedQuestsByPlayerQuery,
  GetAcceptedQuestsByPlayerQueryVariables,
  GetQuestIdsDocument,
  GetQuestIdsQuery,
  GetQuestIdsQueryVariables,
  GetQuestsDocument,
  GetQuestsQuery,
  GetQuestsQueryVariables,
  Order_By,
  QuestStatus_Enum,
} from './autogen/types';
import { client as defaultClient } from './client';
import { QuestFragment } from './fragments';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetQuestIds($limit: Int) {
    quest(limit: $limit, order_by: { createdAt: desc }) {
      id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetQuests(
    $limit: Int
    $status: QuestStatus_enum
    $guildId: uuid
    $order: order_by
    $createdByPlayerId: uuid
    $quest_roles: [String!]
  ) {
    quest(
      limit: $limit
      order_by: { createdAt: $order }
      where: {
        status: { _eq: $status }
        guildId: { _eq: $guildId }
        createdByPlayerId: { _eq: $createdByPlayerId }
        quest_roles: { role: { _in: $quest_roles } }
      }
    ) {
      ...QuestFragment
    }
  }

  ${QuestFragment}
`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetAcceptedQuestsByPlayer(
    $completedByPlayerId: uuid
    $order: order_by
  ) {
    quest_completion(
      order_by: { submittedAt: $order }
      where: { completedByPlayerId: { _eq: $completedByPlayerId } }
    ) {
      ...QuestCompletionFragment
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetQuestGuilds {
    quest_aggregate(distinct_on: guildId) {
      nodes {
        guildId
        guild {
          name
        }
      }
    }
  }
`;

export const defaultQueryVariables: GetQuestsQueryVariables = {
  limit: 10,
  status: QuestStatus_Enum.Open,
  guildId: undefined,
  order: Order_By.Desc,
  createdByPlayerId: undefined,
};

export const getQuestIds = async (
  limit = 50,
  client: Client = defaultClient,
) => {
  const { data } = await client
    .query<GetQuestIdsQuery, GetQuestIdsQueryVariables>(GetQuestIdsDocument, {
      limit,
    })
    .toPromise();

  return data?.quest.map((q) => q.id) || [];
};

export const getQuests = async (
  queryVariables = defaultQueryVariables,
  client: Client = defaultClient,
) => {
  const { data, error } = await client
    .query<GetQuestsQuery, GetQuestsQueryVariables>(
      GetQuestsDocument,
      queryVariables,
    )
    .toPromise();

  console.log('data', data);
  if (!data) {
    if (error) {
      throw error;
    }
    return [];
  }

  return data.quest;
};

export const getAcceptedQuestsByPlayerQuery = async (
  playerId: any,
  order: Order_By = Order_By.Desc,
  client: Client = defaultClient,
) => {
  const { data, error } = await client
    .query<
      GetAcceptedQuestsByPlayerQuery,
      GetAcceptedQuestsByPlayerQueryVariables
    >(GetAcceptedQuestsByPlayerDocument, {
      order,
      completedByPlayerId: playerId,
    })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.quest_completion;
};
