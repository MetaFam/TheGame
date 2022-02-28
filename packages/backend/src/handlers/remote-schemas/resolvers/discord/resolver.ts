import { createDiscordClient } from '@metafam/discord-bot';

import { client } from '../../../../lib/hasuraClient';
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
    return discordGuild.roles.cache.map(({ id, position, name }) => ({
      id,
      position,
      name,
    }));
  }

  return [];
};

export const getDiscordServerMemberRoles: QueryResolvers['getDiscordServerMemberRoles'] = async (
  _,
  { guildId, playerId },
) => {
  const getGuildPlayerResponse = await client.GetGuildPlayerDiscordIds({
    guildId,
    playerId,
  });
  const guildDiscordId = getGuildPlayerResponse.guild_player[0].Guild.discordId;
  const playerDiscordId =
    getGuildPlayerResponse.guild_player[0].Player.discordId;

  if (guildDiscordId == null || playerDiscordId == null) return [];

  const discordClient = await createDiscordClient();
  const discordGuild = await discordClient.guilds.fetch(guildDiscordId);

  if (discordGuild != null) {
    await discordGuild.members.fetch(playerDiscordId);
    await discordGuild.roles.fetch();
    const member = discordGuild.members.cache.get(playerDiscordId);

    if (member == null) return [];

    // these are returned in descending order by position
    // (meaning, most significant role is first)
    return member.roles.cache.map(({ id, position, name }) => ({
      id,
      position,
      name,
    }));
  }

  return [];
};
