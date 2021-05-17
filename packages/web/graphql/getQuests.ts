import gql from 'fake-tag';
import { Client } from 'urql';

import {
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
    quest(limit: $limit, order_by: { created_at: desc }) {
      id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetQuests(
    $limit: Int
    $status: QuestStatus_enum
    $guild_id: uuid
    $order: order_by
    $created_by_player_id: uuid
  ) {
    quest(
      limit: $limit
      order_by: { created_at: $order }
      where: {
        status: { _eq: $status }
        guild_id: { _eq: $guild_id }
        created_by_player_id: { _eq: $created_by_player_id }
      }
    ) {
      ...QuestFragment
    }
  }

  ${QuestFragment}
`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetQuestGuilds {
    quest_aggregate(distinct_on: guild_id) {
      nodes {
        guild_id
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
  guild_id: undefined,
  order: Order_By.Desc,
  created_by_player_id: undefined,
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

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.quest;
};
