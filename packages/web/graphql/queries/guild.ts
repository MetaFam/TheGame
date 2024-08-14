import {
  GetGuildAnnouncementsQuery,
  GetGuildAnnouncementsQueryVariables,
  GetGuildMetadataQuery,
  GetGuildMetadataQueryVariables,
  GetGuildnamesQuery,
  GetGuildnamesQueryVariables,
  GetGuildPlayersQuery,
  GetGuildPlayersQueryVariables,
  GetGuildQuery,
  GetGuildQueryVariables,
  GetGuildsQuery,
  GetGuildsQueryVariables,
  GuildFragment as GuildFragmentType,
  GuildLinksQuery,
  GuildLinksQueryVariables,
  GuildStatus_Enum,
  SearchGuildsQuery,
  SearchGuildsQueryVariables,
} from 'graphql/autogen/hasura-sdk';

import { GuildFragment, PlayerFragment } from '#graphql/fragments';
import { GuildPlayer } from '#graphql/types';

import { client } from '../client';

const getGuildLinksQuery = /* GraphQL */ `
  query GuildLinks($guildId: uuid!) {
    link(where: { guildId: { _eq: $guildId } }) {
      guildId
      name
      type
      url
      id
    }
  }
`;

export const getGuildLinks = async (guildId: string) => {
  if (!guildId) throw new Error('Missing Player Id');
  const { error, data } = await client
    .query<GuildLinksQuery, GuildLinksQueryVariables>(getGuildLinksQuery, {
      guildId,
    })
    .toPromise();

  if (error) throw error;

  return data;
};

const guildQuery = /* GraphQL */ `
  query GetGuild($guildname: String!) {
    guild(where: { guildname: { _eq: $guildname } }) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuild = async (guildname: string | undefined) => {
  if (guildname) {
    const { error, data } = await client
      .query<GetGuildQuery, GetGuildQueryVariables>(guildQuery, { guildname })
      .toPromise();

    if (error) throw error;

    return data?.guild[0];
  }
  return undefined;
};

const guildMetadataQuery = /* GraphQL */ `
  query GetGuildMetadata($id: uuid!) {
    guild_metadata(where: { guildId: { _eq: $id } }) {
      guildId
      discordMetadata
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
  const { error, data } = await client
    .query<GetGuildMetadataQuery, GetGuildMetadataQueryVariables>(
      guildMetadataQuery,
      { id },
    )
    .toPromise();

  if (error) throw error;

  return data?.guild_metadata[0];
};

export const getAdministeredGuildsQuery = /* GraphQL */ `
  query GetAdministeredGuilds($id: uuid!) {
    guild_metadata(where: { creatorId: { _eq: $id } }) {
      guildId
    }
  }
`;

const guildsQuery = /* GraphQL */ `
  query GetGuilds($limit: Int) {
    guild(
      where: { status: { _eq: ACTIVE } }
      limit: $limit
      order_by: { sortPosition: asc_nulls_last }
    ) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuilds = async (limit = 50) => {
  const { error, data } = await client
    .query<GetGuildsQuery, GetGuildsQueryVariables>(guildsQuery, { limit })
    .toPromise();

  if (error) throw error;

  return data?.guild;
};

const guildnamesQuery = /* GraphQL */ `
  query GetGuildnames($status: GuildStatus_enum, $limit: Int) {
    guild(where: { status: { _eq: $status } }, limit: $limit) {
      id
      guildname
    }
  }
`;

export const getGuildnames = async (
  status = GuildStatus_Enum.Active,
  limit = 50,
) => {
  const { data, error } = await client
    .query<GetGuildnamesQuery, GetGuildnamesQueryVariables>(guildnamesQuery, {
      status,
      limit,
    })
    .toPromise();

  if (error) throw error;

  return data?.guild.map(({ guildname }) => guildname);
};

const getGuildPlayersQuery = /* GraphQL */ `
  query GetGuildPlayers($guildId: uuid!) {
    guild_player(where: { guildId: { _eq: $guildId } }) {
      Player {
        id
        totalXP
        rank
        ethereumAddress
        profile {
          username
          profileImageURL
          name
        }
      }
    }
  }
  ${PlayerFragment}
`;

export const getGuildPlayers = async (
  guildId: string,
  isMetafam = false,
): Promise<GuildPlayer[] | void> => {
  if (!guildId) return [];
  const { error, data } = await client
    .query<GetGuildPlayersQuery, GetGuildPlayersQueryVariables>(
      getGuildPlayersQuery,
      { guildId },
    )
    .toPromise();

  if (error) throw error;

  const guildPlayers = data?.guild_player.map((gp) => ({
    ...gp.Player,
    role: isMetafam ? gp.Player.rank : null,
  }));
  if (isMetafam) {
    guildPlayers?.sort((p1, p2) => p2.totalXP - p1.totalXP);
  }

  return guildPlayers;
};

const getGuildAnnouncementsQuery = /* GraphQL */ `
  query GetGuildAnnouncements($guildId: uuid!) {
    guild(where: { id: { _eq: $guildId } }) {
      id
      discordAnnouncements
    }
  }
  ${PlayerFragment}
`;

export const getGuildAnnouncements = async (guildId: string) => {
  if (!guildId) return [];

  const { error, data } = await client
    .query<GetGuildAnnouncementsQuery, GetGuildAnnouncementsQueryVariables>(
      getGuildAnnouncementsQuery,
      { guildId },
    )
    .toPromise();

  if (error) throw error;

  return data?.guild[0].discordAnnouncements;
};

const guildSearch = /* GraphQL */ `
  query SearchGuilds($search: String!, $limit: Int) {
    guild(where: { name: { _ilike: $search } }, limit: $limit) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const searchGuilds = async ({
  search = '',
  limit,
}: {
  search: string;
  limit?: number | undefined;
}) => {
  const { data, error } = await client
    .query<SearchGuildsQuery, SearchGuildsQueryVariables>(guildSearch, {
      search: `%${search}%`,
      limit,
    })
    .toPromise();

  if (error) throw error;

  return {
    guilds: data?.guild || [],
  };
};
