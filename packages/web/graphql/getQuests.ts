import gql from 'fake-tag';
import { Client } from 'urql';

import { GetQuestsDocument, GetQuestsQuery, QuestStatus_Enum, GetQuestsQueryVariables } from './autogen/types';
import { client as defaultClient } from './client';
import { QuestFragment } from './fragments';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetQuests($limit: Int, $status: QuestStatus_enum) {
    quest(
      limit: $limit,
      where: {
        status: {_eq : $status},
      }
    ) {
      ...QuestFragment
    }
  }

  ${QuestFragment}
`;

export const defaultQueryVariables: GetQuestsQueryVariables = {
  limit: 10,
  status: QuestStatus_Enum.Open,
}

export const getQuests = async (queryVariables = defaultQueryVariables, client: Client = defaultClient) => {
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
