import gql from 'fake-tag';
import { GuildPlayer } from 'graphql/types';

import {
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
  GuildFragmentFragment,
  GuildStatus_Enum,
} from '../autogen/types';
import { client } from '../client';
import { GuildFragment, PlayerFragment } from '../fragments';

const guildQuery = gql`
  query GetGuild($guildname: String!) {
    guild(where: { guildname: { _eq: $guildname } }) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuild = async (
  guildname: string | undefined,
): Promise<GuildFragmentFragment | undefined> => {
  if (guildname) {
    const { data } = await client
      .query<GetGuildQuery, GetGuildQueryVariables>(guildQuery, { guildname })
      .toPromise();

    return data?.guild[0];
  }
  return undefined;
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

const guildsQuery = gql`
  query GetGuilds($limit: Int) {
    guild(where: { status: { _eq: ACTIVE } }, limit: $limit) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuilds = async (
  limit = 50,
): Promise<GuildFragmentFragment[]> => {
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
  query GetGuildnames($status: GuildStatus_enum, $limit: Int) {
    guild(where: { status: { _eq: $status } }, limit: $limit) {
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

  return data.guild.map((g) => g.guildname);
};

const getGuildPlayersQuery = gql`
  query GetGuildPlayers($guildId: uuid!) {
    guild_player(where: { guild_id: { _eq: $guildId } }) {
      Player {
        username
        total_xp
        rank
        profile_cache {
          imageURL
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
    guildPlayers?.sort((p1, p2) => p2.total_xp - p1.total_xp);
  }

  return guildPlayers;
};
