import gql from 'fake-tag';

import { GetGuildsQuery, GetGuildsQueryVariables, GuildStatus_Enum } from './autogen/types';
import { client } from './client';
import { GuildFragment } from './fragments';

const guildsQuery = gql`
  query GetGuilds($statuses: [GuildStatus_enum!], $limit: Int) {
    guild(where: {status: { _in: $statuses }}, limit: $limit) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuilds = async (status: GuildStatus_Enum | GuildStatus_Enum[], limit = 50) => {
  let statuses = status;
  if (!Array.isArray(status)) {
    statuses = [status];
  }
  const { data, error } = await client
    .query<GetGuildsQuery, GetGuildsQueryVariables>(guildsQuery, { statuses, limit })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.guild;
};
