import { createDiscordClient } from '@metafam/discord-bot';
import {
  ChannelType, PermissionFlagsBits, TextChannel,
} from 'discord.js';
import showdown from 'showdown';

import { client } from '#lib/hasuraClient';

const { Converter } = showdown;

export const getGuildDiscordRoles =
  async (_: unknown, { guildDiscordId }: { guildDiscordId: string }) => {
    if (!guildDiscordId) return [];

    const discordClient = await createDiscordClient();
    const discordGuild = await discordClient.guilds.fetch(guildDiscordId);

    if (discordGuild != null) {
      await discordGuild.roles.fetch();
      return discordGuild.roles.cache.map(({ id, position, name }) => (
        { id, position, name }
      ));
    }

    return [];
  };

export const getDiscordServerMemberRoles = (
  async (
    _: unknown,
    { guildId, playerId }: { guildId: string, playerId: string }
  ) => {
    const getGuildPlayerResponse = await client.GetGuildPlayerDiscordIds({
      guildId,
      playerId,
    });
    const guildDiscordId =
      getGuildPlayerResponse.guild_player[0].Guild.discordId;
    const playerDiscordId =
      getGuildPlayerResponse.guild_player[0].Player.discordId;

    if (guildDiscordId == null || playerDiscordId == null) return [];

    try {
      const discordClient = await createDiscordClient();
      const discordGuild = await discordClient.guilds.fetch(guildDiscordId);

      if (discordGuild != null) {
        await discordGuild.members.fetch(playerDiscordId);
        await discordGuild.roles.fetch();
        const member = discordGuild.members.cache.get(playerDiscordId);

        if (member == null) return [];

        // these are returned in descending order by position
        // (meaning, most significant role is first)
        return member.roles.cache.map(({ id, position, name }) => (
          { id, position, name }
        ));
      }
    } catch (err) {
      console.error({ err });
    }
    return [];
  }
)

export const getGuildDiscordAnnouncements =
  async (_: unknown, { guildDiscordId }: { guildDiscordId: string }) => {
    if (!guildDiscordId) return [];

    try {
      const discordClient = await createDiscordClient();
      const discordGuild = await discordClient.guilds.fetch(guildDiscordId);
      if (discordGuild != null) {
        // This is necessary to populate 'me' to get our own permissions in this server.
        // It also seems to be necessary to populate the "channels" cache used below
        await discordGuild.members.fetch();
        const viewChannelPerm = (
          discordGuild.members.me?.permissions.has(PermissionFlagsBits.ViewChannel)
        );
        if (!viewChannelPerm) {
          console.warn(
            `Guild (id=${guildDiscordId}) does not have the VIEW_CHANNEL permission, skipping announcement fetching…`,
          );
          return [];
        }
        const newsChannels = discordGuild.channels.cache.filter(
          ({ type }) => type === ChannelType.GuildAnnouncement
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
