import gql from 'fake-tag';

import {
  GetGuildMetadataQuery,
  GetGuildMetadataQueryVariables,
  GetGuildQuery,
  GetGuildQueryVariables,
} from './autogen/types';
import { client } from './client';
import { GuildFragment } from './fragments';

const guildQuery = gql`
  query GetGuild($guildname: String!) {
    guild(where: { guildname: { _eq: $guildname } }) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuild = async (guildname: string | undefined) => {
  if (!guildname) return null;
  const { data } = await client
    .query<GetGuildQuery, GetGuildQueryVariables>(guildQuery, { guildname })
    .toPromise();

  return data?.guild[0];
};

const guildMetadataQuery = gql`
  query GetGuildMetadata($id: uuid!) {
    guild_metadata(where: { guild_id: { _eq: $id } }) {
      guild_id
      discord_metadata
      discordRoles {
        id
        name
        position
      }
    }
  }
`;

export const getGuildMetadata = async (id: string) => {
  if (!id) return null;
  const { data } = await client
    .query<GetGuildMetadataQuery, GetGuildMetadataQueryVariables>(
      guildMetadataQuery,
      { id },
    )
    .toPromise();
  return data?.guild_metadata[0];
};
