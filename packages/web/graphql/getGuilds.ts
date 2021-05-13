import gql from 'fake-tag';

import {
  GetGuildnamesQuery,
  GetGuildnamesQueryVariables,
  GetGuildsQuery,
  GetGuildsQueryVariables,
} from './autogen/types';
import { client } from './client';
import { GuildFragment } from './fragments';

const guildsQuery = gql`
  query GetGuilds($limit: Int) {
    guild(where: { status: { _eq: ACTIVE } }, limit: $limit) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuilds = async (limit = 50) => {
  const { data, error } = await client
    .query<GetGuildsQuery, GetGuildsQueryVariables>(guildsQuery, { limit })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.guild;
};

const guildnamesQuery = gql`
  query GetGuildnames($limit: Int) {
    guild(where: { status: { _eq: ACTIVE } }, limit: $limit) {
      guildname
    }
  }
`;

export const getGuildnames = async (limit = 50) => {
  const { data, error } = await client
    .query<GetGuildnamesQuery, GetGuildnamesQueryVariables>(guildnamesQuery, {
      limit,
    })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.guild.map((g) => g.guildname);
};
