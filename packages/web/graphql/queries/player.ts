import { client } from 'graphql/client';

const getPlayerlinksQuery = /* GraphQL */ `
  query GetPlayerLinks($playerId: uuid!) {
    link(where: { player_id: { _eq: $playerId } }) {
      name
      type
      url
    }
  }
`;

export const getPlayerLinks = async (id: string) => {
  if (!id) throw new Error('Missing Player Id');
  const { data } = await client.query(getPlayerlinksQuery, { id }).toPromise();
  return data;
};
