import { createDiscordClient } from '@metafam/discord-bot';
import { GuildBasedChannel, Role, TextChannel } from 'discord.js';
import showdown from 'showdown';

import { client } from '../../../../lib/hasuraClient.js';
import { QueryResolvers } from '../../autogen/types.js';

const { Converter } = showdown;

export const getGuildDiscordRoles: QueryResolvers['getGuildDiscordRoles'] =
  async (_, { guildDiscordId }) => {
    if (!guildDiscordId) return [];

    const discordClient = await createDiscordClient();
    const discordGuild = await discordClient.guilds.fetch(guildDiscordId);

    if (discordGuild != null) {
      await discordGuild.roles.fetch();
      return discordGuild.roles.cache.map((role: Role) => ({
        id: role.id,
        position: role.position,
        name: role.name,
      }));
    }

    return [];
  };

export const getDiscordServerMemberRoles: QueryResolvers['getDiscordServerMemberRoles'] =
  async (_, { guildId, playerId }) => {
    const getGuildPlayerResponse = await client.GetGuildPlayerDiscordIds({
      guildId,
      playerId,
    });
    const guildDiscordId =
      getGuildPlayerResponse.guild_player[0].Guild.discordId;
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
      return member.roles.cache.map((role: Role) => ({
        id: role.id,
        position: role.position,
        name: role.name,
      }));
    }

    return [];
  };

export const getGuildDiscordAnnouncements: QueryResolvers['getGuildDiscordAnnouncements'] =
  async (_, { guildDiscordId }) => {
    if (!guildDiscordId) return [];

    try {
      const discordClient = await createDiscordClient();
      const discordGuild = await discordClient.guilds.fetch(guildDiscordId);
      if (discordGuild != null) {
        // This is necessary to populate 'me' to get our own permissions in this server.
        // It also seems to be necessary to populate the "channels" cache used below
        await discordGuild.members.fetch();
        const viewChannelPerm =
          discordGuild.me?.permissions.has('VIEW_CHANNEL');
        if (!viewChannelPerm) {
          console.warn(
            `Guild (id=${guildDiscordId}) does not have the VIEW_CHANNEL permission, skipping announcement fetching...`,
          );
          return [];
        }
        const newsChannels = discordGuild.channels.cache.filter(
          (channel: GuildBasedChannel) => channel.type === 'GUILD_NEWS',
        );

        if (newsChannels.size > 0) {
          const announcementChannelMessages = await Promise.all(
            newsChannels.map(async (channel) => {
              const messages = await (channel as TextChannel).messages.fetch();
              if (messages == null) {
                return [];
              }
              return messages
                .sorted((m1, m2) => m2.createdTimestamp - m1.createdTimestamp)
                .first(10);
            }),
          );

          const combinedMessages = announcementChannelMessages.reduce(
            (allMessages, channelMessages) =>
              allMessages.concat(channelMessages),
            [],
          );
          combinedMessages.sort(
            (m1, m2) => m2.createdTimestamp - m1.createdTimestamp,
          );

          const markdownConverter = new Converter({ simpleLineBreaks: true });

          return combinedMessages
            .slice(0, 10)
            .map((message) => markdownConverter.makeHtml(message.cleanContent));
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  };
