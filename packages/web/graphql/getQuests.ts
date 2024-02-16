import {
  GetCompletedQuestsByPlayerDocument,
  GetCompletedQuestsByPlayerQuery,
  GetCompletedQuestsByPlayerQueryVariables,
  GetQuestIdsDocument,
  GetQuestIdsQuery,
  GetQuestIdsQueryVariables,
  GetQuestsDocument,
  GetQuestsQuery,
  GetQuestsQueryVariables,
  Order_By,
  QuestStatus_Enum,
  Scalars,
  SearchQuestsDocument,
  SearchQuestsQuery,
  SearchQuestsQueryVariables,
} from 'graphql/autogen/types';
import { client as defaultClient } from 'graphql/client';
import { QuestCompletionFragment, QuestFragment } from 'graphql/fragments';
import { Client } from 'urql';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  query GetQuestIds($limit: Int) {
    quest(limit: $limit, order_by: { createdAt: desc }) {
      id
    }
  }

  query GetQuests(
    $limit: Int
    $status: QuestStatus_enum
    $guildId: uuid
    $order: order_by
    $createdByPlayerId: uuid
    $questRoles: [String!]
    $search: String
  ) {
    quest(
      limit: $limit
      order_by: { createdAt: $order }
      where: {
        status: { _eq: $status }
        guildId: { _eq: $guildId }
        createdByPlayerId: { _eq: $createdByPlayerId }
        _or: [ 
           { title : { _ilike: $search }},
           { description : { _ilike: $search }}
        ]
        
      }
    ) {
      ...QuestFragment
    }
  }

   query SearchQuests(
    $limit: Int = 3
    $search: String
  ) {
    quest(
      limit: $limit
       where: {
         _or: [ 
           { title : { _ilike: $search }},
           { description : { _ilike: $search }}
        ]
       }
     )
    {
      id,
      description,
      title,
      image
    }
  }

  

  query GetCompletedQuestsByPlayer(
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

  query GetQuestsWithCompletions(
    $createdByPlayerId: uuid!
    $completionStatus: QuestCompletionStatus_enum
  ) {
    quest(
      order_by: { createdAt: desc }
      where: {
        status: { _eq: OPEN }
        createdByPlayerId: { _eq: $createdByPlayerId }
        quest_completions: {
          status: { _eq: $completionStatus}
        }
      }
    ) {
      id
      title
      quest_completions {
        id
        player {
          profile {
            name
            username
          }
          ethereumAddress
        }
        submittedAt
        submissionLink
        submissionText
      }
    }
  }

  ${QuestFragment}
  ${QuestCompletionFragment}
`;

export const defaultQueryVariables: GetQuestsQueryVariables = {
  limit: 50,
  status: QuestStatus_Enum.Open,
  guildId: undefined,
  order: Order_By.Desc,
  createdByPlayerId: undefined,
  search: '%%',
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

export const searchQuests = async (
  search = '%%',
  limit = 3,
  client: Client = defaultClient,
) => {
  const { data, error } = await client
    .query<SearchQuestsQuery, SearchQuestsQueryVariables>(
      SearchQuestsDocument,
      {
        search: `%${search}%`,
        limit,
      },
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

export const getCompletedQuestsByPlayerQuery = async (
  completedByPlayerId: Scalars['uuid'],
  client: Client = defaultClient,
) => {
  const { data, error } = await client
    .query<
      GetCompletedQuestsByPlayerQuery,
      GetCompletedQuestsByPlayerQueryVariables
    >(GetCompletedQuestsByPlayerDocument, {
      completedByPlayerId,
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
