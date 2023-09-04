import {
  createDiscordClient,
  GuildDiscordMetadata,
} from '@metafam/discord-bot';
import { Request, Response } from 'express';

import {
  Guild_Player_Insert_Input,
  GuildFragment,
  GuildStatus_Enum,
  SyncGuildMembersMutation,
} from '../../../lib/autogen/hasura-sdk.js';
import { client } from '../../../lib/hasuraClient.js';
import { GuildRow, toGuild, TriggerPayload } from '../../triggers/types.js';

export const syncDiscordGuildMembers = async (
  payload: TriggerPayload<GuildRow>,
) => {
  const { new: guild } = payload.event.data;

  try {
    if (guild != null) {
      await syncGuildMembers(toGuild(guild));
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

    const responses = await Promise.allSettled(
      guilds
        .filter((guild) => guild.membershipThroughDiscord)
        .map((guild) =>
          syncGuildMembers(guild).catch((e) => {
            throw new Error(`${guild.name}: ${e.message}`);
          }),
        ),
    );

    const errors = responses.filter((r) => r.status === 'rejected');

    const successfulResults = responses
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as PromiseFulfilledResult<unknown>).value);

    if (errors.length > 0) {
      const errorsPerGuild = errors
        .map((e) => (e as PromiseRejectedResult).reason)
        .join('\n');
      const successes = successfulResults
        .map((o) => (o as { name: string }).name)
        .join('\n');
      const msg = `Failed to sync ${errors.length} guilds:\n${errorsPerGuild}\n\n but successfully synced ${successfulResults.length} guilds:\n${successes}`;
      throw new Error(msg);
    } else {
      res.status(200).json(successfulResults);
    }
  } catch (e) {
    const msg = (e as Error).message ?? e;
    const out = `Error syncing Discord guild memberships: ${msg}`;
    console.error(out);

    res.status(500).send(out);
  }
};

const syncGuildMembers = async (guild: GuildFragment) => {
  if (!guild.membershipThroughDiscord) {
    throw new Error(`Guild ${guild.name} does not use Discord.`);
  }
  if (guild?.discordId == null) {
    throw new Error(`Guild ${guild.name} has no discordId.`);
  }

  const getMetadataResponse = await client.GetGuildMetadataById({
    id: guild.id,
  });
  const [guildMetadata] = getMetadataResponse.guild_metadata || [];
  if (guildMetadata == null || guildMetadata.discordMetadata == null) {
    throw new Error(`Guild ${guild.name} has no metadata.`);
  }

  const { membershipRoleIds: discordServerMembershipRoles } =
    guildMetadata.discordMetadata as GuildDiscordMetadata;
  if (
    discordServerMembershipRoles == null ||
    discordServerMembershipRoles?.length === 0
  ) {
    throw new Error(`Guild ${guild.name} has no membership roles.`);
  }

  let numDeleted = 0;
  let numInserted = 0;
  let numSkipped = 0;

  // only sync on ACTIVE guilds. For all others, remove all members
  if (guild.status !== GuildStatus_Enum.Active) {
    const removeResponse = await client.RemoveAllGuildMembers({
      guildId: guild.id,
    });
    numDeleted = removeResponse.delete_guild_player?.affected_rows ?? 0;
    if (numDeleted != null && numDeleted > 0) {
      console.log(`Removed ${numDeleted} players from ${guild.status} guild.`);
    }
  } else {
    const discordClient = await createDiscordClient();
    const discordGuild = await discordClient.guilds.fetch(guild.discordId);

    if (discordGuild == null) {
      throw new Error(`Discord server ${guild.discordId} does not exist!`);
    }

    const getGuildMembersResponse = await client.GetGuildMembers({
      id: guild.id,
    });
    const maybeGuildMemberDiscordIds =
      getGuildMembersResponse.guild[0].guild_players.map(
        (p) => p.Player.discordId,
      );
    const guildMemberDiscordIds = maybeGuildMemberDiscordIds.filter(
      (id) => !!id,
    ) as Array<string>;
    numSkipped +=
      maybeGuildMemberDiscordIds.length - guildMemberDiscordIds.length;

    await discordGuild.members.fetch();

    const discordGuildMembers = discordGuild.members.cache.filter(
      (discordMember) =>
        discordMember.roles.cache.some((role) =>
          discordServerMembershipRoles.includes(role.id),
        ),
    );

    const discordServerMemberIds: Array<string> = [];
    const playerDiscordIdsToAdd: Array<string> = [];
    discordGuildMembers.forEach(({ user: { id } }) => {
      discordServerMemberIds.push(id);
      if (!guildMemberDiscordIds.includes(id)) {
        playerDiscordIdsToAdd.push(id);
      }
    });

    numSkipped += discordServerMemberIds.length - playerDiscordIdsToAdd.length;

    const playersToRemove = guildMemberDiscordIds.filter(
      (discordId) => !discordServerMemberIds.includes(discordId),
    );

    const getPlayerIdsResponse = await client.GetPlayersByDiscordId({
      discordIds: playerDiscordIdsToAdd,
    });

    const playersToAdd: Guild_Player_Insert_Input[] =
      getPlayerIdsResponse.player.map((player) => ({
        guildId: guild.id,
        playerId: player.id,
      }));

    if (playersToAdd.length === 0 && playersToRemove.length === 0) {
      console.info(`No changes for guild: ${guild.name}.`);
    } else {
      const syncResponse: SyncGuildMembersMutation =
        await client.SyncGuildMembers({
          memberDiscordIdsToRemove: playersToRemove,
          membersToAdd: playersToAdd,
        });

      numDeleted = syncResponse.delete_guild_player?.affected_rows ?? 0;
      numInserted = syncResponse.insert_guild_player?.affected_rows ?? 0;

      let logStr = '';

      if (numInserted > 0) {
        logStr = `Added ${numInserted} players`;
      }
      if (numDeleted > 0) {
        logStr += `${
          logStr.length > 0 ? ' and removed' : 'Removed'
        } ${numDeleted} players`;
      }

      if (logStr.length > 0) {
        console.log(
          `Updated guild members for ${guild?.name} from Discord. ${logStr}`,
        );
      }
    }
  }

  return {
    name: guild.name,
    username: guild.guildname,
    numInserted,
    numDeleted,
    numSkipped,
  };
};
