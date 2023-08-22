import {
  GetPlayerLinksQuery,
  GetPlayerLinksQueryVariables,
} from 'graphql/autogen/types';

import { client } from '../client';

const getPlayerlinksQuery = /* GraphQL */ `
  query GetPlayerLinks($playerId: uuid!) {
    link(where: { player_id: { _eq: $playerId } }) {
      name
      type
      url
    }
  }
`;

export const getPlayerLinks = async (playerId: string): Promise<any> => {
  if (!playerId) throw new Error('Missing Player Id');
  const { data } = await client
    .query<GetPlayerLinksQuery, GetPlayerLinksQueryVariables>(
      getPlayerlinksQuery,
      { playerId },
    )
    .toPromise();
  return data;
};
