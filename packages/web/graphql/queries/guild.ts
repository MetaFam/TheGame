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
  GuildStatus_Enum,
  Maybe,
  SearchGuildsQuery,
  SearchGuildsQueryVariables,
} from 'graphql/autogen/types';
import { GuildFragment, PlayerFragment } from 'graphql/fragments';
import { GuildPlayer } from 'graphql/types';

import { client } from '../client';

const guildQuery = /* GraphQL */ `
  query GetGuild($guildname: String!) {
    guild(where: { guildname: { _eq: $guildname } }) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuild = async (
  guildname: string | undefined,
): Promise<GuildFragmentType | undefined> => {
  if (guildname) {
    const { data } = await client
      .query<GetGuildQuery, GetGuildQueryVariables>(guildQuery, { guildname })
      .toPromise();

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
  const { data } = await client
    .query<GetGuildMetadataQuery, GetGuildMetadataQueryVariables>(
      guildMetadataQuery,
      { id },
    )
    .toPromise();
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

export const getGuilds = async (limit = 50): Promise<GuildFragmentType[]> => {
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
): Promise<string[]> => {
  const { data, error } = await client
    .query<GetGuildnamesQuery, GetGuildnamesQueryVariables>(guildnamesQuery, {
      status,
      limit,
    })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }
    return [];
  }

  return data.guild.map(({ guildname }) => guildname);
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
): Promise<GuildPlayer[]> => {
  if (!guildId) return [];
  const { data } = await client
    .query<GetGuildPlayersQuery, GetGuildPlayersQueryVariables>(
      getGuildPlayersQuery,
      { guildId },
    )
    .toPromise();

  if (!data) return [];

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

export const getGuildAnnouncements = async (
  guildId: string,
): Promise<Maybe<string[]> | undefined> => {
  if (!guildId) return [];
  const { data } = await client
    .query<GetGuildAnnouncementsQuery, GetGuildAnnouncementsQueryVariables>(
      getGuildAnnouncementsQuery,
      { guildId },
    )
    .toPromise();

  if (!data) return [];
  return data.guild[0].discordAnnouncements;
};

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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

  if (!data && error) throw new Error(`Error:- ${error}`);

  return {
    guilds: data?.guild || [],
  };
};
