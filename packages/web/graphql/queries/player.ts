import {
  GetPlayerLinksQuery,
  GetPlayerLinksQueryVariables,
} from 'graphql/autogen/types';

import { client } from '../client';

const getPlayerLinksQuery = /* GraphQL */ `
  query GetPlayerLinks($playerId: uuid!) {
    link(where: { playerId: { _eq: $playerId } }) {
      id
      name
      type
      url
    }
  }
`;

export const getPlayerLinks = async (playerId: string) => {
  if (!playerId) throw new Error('Missing Player Id');
  const { data } = await client
    .query<GetPlayerLinksQuery, GetPlayerLinksQueryVariables>(
      getPlayerLinksQuery,
      { playerId },
    )
    .toPromise();
  return data;
};
