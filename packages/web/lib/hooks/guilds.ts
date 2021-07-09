import { DiscordRole, useGetGuildMetadataQuery } from 'graphql/autogen/types';

export type GetGuildMetadataHook = {
  discordRoles: DiscordRole[];
  fetching: boolean;
};

export const useGetGuildMetadata: (guildId: string) => GetGuildMetadataHook = (
  guildId: string,
) => {
  const [getGuildMetadataResponse] = useGetGuildMetadataQuery({
    variables: { id: guildId },
  });
  const discordRoles =
    getGuildMetadataResponse.data?.guild_metadata[0].discordRoles || [];

  return {
    discordRoles,
    fetching: getGuildMetadataResponse.fetching,
  };
};
