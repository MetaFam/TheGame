import gql from 'fake-tag';

import { GetGuildsQuery, GetGuildsQueryVariables, GuildStatus_Enum } from './autogen/types';
import { client } from './client';
import { GuildFragment } from './fragments';

const guildsQuery = gql`
  query GetGuilds($status: GuildStatus_enum, $limit: Int) {
    guild(where: {status: { _eq: $status }}, limit: $limit) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuilds = async (status: GuildStatus_Enum, limit = 50) => {
  const { data, error } = await client
    .query<GetGuildsQuery, GetGuildsQueryVariables>(guildsQuery, { status, limit })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.guild;
};
