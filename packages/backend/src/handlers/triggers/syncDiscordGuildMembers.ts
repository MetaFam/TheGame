/* eslint-disable no-console */
import {
  createDiscordClient,
  GuildDiscordMetadata,
} from '@metafam/discord-bot';
import { Request, Response } from 'express';

import {
  Guild,
  Guild_Player_Insert_Input,
  GuildFragmentFragment,
  GuildStatus_Enum,
  SyncGuildMembersMutation,
} from '../../lib/autogen/hasura-sdk';
import { client } from '../../lib/hasuraClient';
import { TriggerPayload } from './types';

export const syncDiscordGuildMembers = async (
  payload: TriggerPayload<Guild>,
) => {
  const { new: guild } = payload.event.data;

  try {
    if (guild != null) {
      await syncGuildMembers(guild);
    }
  } catch (e) {
    console.error(e);
  }
};

export const syncAllGuildDiscordMembers = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { guild: guilds } = await client.GetGuilds({
      status: GuildStatus_Enum.Active,
    });

    await Promise.all(
      guilds
        .filter((guild) => guild.membership_through_discord === true)
        .map((guild) => syncGuildMembers(guild)),
    );

    res.sendStatus(200);
  } catch (e) {
    const msg = (e as Error).message;
    console.warn('Error syncing guild memberships from discord', msg);
    console.error(e);

    res.sendStatus(500);
  }
};

const syncGuildMembers = async (guild: GuildFragmentFragment) => {
  if (guild?.discord_id == null) return;

  const getMetadataResponse = await client.GetGuildMetadataById({
    id: guild.id,
  });
  const guildMetadata = getMetadataResponse.guild_metadata[0];
  if (
    guildMetadata == null ||
    guildMetadata.discord_metadata == null ||
    guild.membership_through_discord === false
  )
    return;

  // at least one membership role must be defined
  const discordServerMembershipRoles = (guildMetadata.discord_metadata as GuildDiscordMetadata)
    .membershipRoleIds;
  if (
    discordServerMembershipRoles == null ||
    discordServerMembershipRoles?.length === 0
  ) {
    return;
  }

  // only sync on ACTIVE guilds. For all others, remove all guild_players
  if (guild.status !== GuildStatus_Enum.Active) {
    const removeResponse = await client.RemoveAllGuildMembers({
      guildId: guild.id,
    });
    const numDeleted = removeResponse.delete_guild_player?.affected_rows;
    if (numDeleted != null && numDeleted > 0) {
      console.log(`Removed ${numDeleted} players from ${guild.status} guild`);
    }
    return;
  }

  const discordClient = await createDiscordClient();
  const discordGuild = await discordClient.guilds.fetch(guild.discord_id);

  if (discordGuild == null)
    throw new Error(`Discord server ${guild.discord_id} does not exist!`);

  const getGuildMembersResponse = await client.GetGuildMembers({
    id: guild.id,
  });
  const guildMemberDiscordIds = getGuildMembersResponse.guild[0].guild_players
    .filter((p) => p.Player.discord_id != null)
    .map((p) => p.Player.discord_id) as string[];

  await discordGuild.members.fetch();

  // gather all discord server members who have at least one of the "membership" roles
  // as defined by this guild
  const discordGuildMembers = discordGuild.members.cache.filter(
    (discordMember) =>
      discordMember.roles.cache.some((role) =>
        discordServerMembershipRoles.includes(role.id),
      ),
  );

  // gather discord server members who are not already members of this guild
  const discordServerMemberIds: string[] = [];
  const playerDiscordIdsToAdd: string[] = [];
  discordGuildMembers.forEach((discordMember) => {
    discordServerMemberIds.push(discordMember.user.id);
    if (!guildMemberDiscordIds.includes(discordMember.user.id)) {
      playerDiscordIdsToAdd.push(discordMember.user.id);
    }
  });

  // gather current members of this guild who are not in the list of discord server members
  const playersToRemove = guildMemberDiscordIds.filter(
    (discordId) => !discordServerMemberIds.includes(discordId),
  );

  const getPlayerIdsResponse = await client.GetPlayersByDiscordId({
    discordIds: playerDiscordIdsToAdd,
  });

  const playersToAdd: Guild_Player_Insert_Input[] = getPlayerIdsResponse.player.map(
    (player) => ({
      guild_id: guild.id,
      player_id: player.id,
    }),
  );

  const syncResponse: SyncGuildMembersMutation = await client.SyncGuildMembers({
    memberDiscordIdsToRemove: playersToRemove,
    membersToAdd: playersToAdd,
  });

  const numDeleted = syncResponse.delete_guild_player?.affected_rows;
  const numInserted = syncResponse.insert_guild_player?.affected_rows;

  let logStr = '';

  if (numInserted != null && numInserted > 0) {
    logStr = `Added ${numInserted} players`;
  }
  if (numDeleted != null && numDeleted > 0) {
    logStr += `${
      logStr.length > 0 ? ' and removed' : 'Removed'
    } ${numDeleted} players`;
  }

  if (logStr.length > 0) {
    console.log(
      `Updated guild members for ${guild?.name} from Discord. ${logStr}`,
    );
  }
};
