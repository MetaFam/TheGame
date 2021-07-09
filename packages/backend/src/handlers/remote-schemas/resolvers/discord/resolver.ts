import { createDiscordClient } from '@metafam/discord-bot';

import { QueryResolvers } from '../../autogen/types';

export const getGuildDiscordRoles: QueryResolvers['getGuildDiscordRoles'] = async (
  _,
  { guildDiscordId },
) => {
  if (!guildDiscordId) return [];

  const discordClient = await createDiscordClient();

  const discordGuild = await discordClient.guilds.fetch(guildDiscordId);

  if (discordGuild != null) {
    await discordGuild.roles.fetch();
    return discordGuild.roles.cache.map((role) => ({
      id: role.id,
      position: role.position,
      name: role.name,
    }));
  }

  return [];
};
