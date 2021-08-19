/* eslint-disable no-console */
import {
  createDiscordClient,
  GuildDiscordMetadata,
} from '@metafam/discord-bot';

import {
  Guild,
  Guild_Player_Insert_Input,
  GuildStatus_Enum,
  SyncGuildMembersMutation,
} from '../../lib/autogen/hasura-sdk';
import { client } from '../../lib/hasuraClient';
import { TriggerPayload } from './types';

export const syncDiscordGuildMembers = async (
  payload: TriggerPayload<Guild>,
) => {
  // if (CONFIG.nodeEnv !== 'production') return;

  const { new: guild } = payload.event.data;

  if (guild?.discord_id == null) return;

  console.log(`updating guild members for ${guild?.name} from Discord...`);

  try {
    const getMetadataResponse = await client.GetGuildMetadataById({
      id: guild.id,
    });
    const guildMetadata = getMetadataResponse.guild_metadata[0];
    if (
      guildMetadata == null ||
      guildMetadata.membership_through_discord === false ||
      guildMetadata.discord_metadata == null
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

    const syncResponse: SyncGuildMembersMutation = await client.SyncGuildMembers(
      {
        memberDiscordIdsToRemove: playersToRemove,
        membersToAdd: playersToAdd,
      },
    );

    const numDeleted = syncResponse.delete_guild_player?.affected_rows;
    const numInserted = syncResponse.insert_guild_player?.affected_rows;

    if (numDeleted != null && numDeleted > 0) {
      console.log(`Removed ${numDeleted} players`);
    }
    if (numInserted != null && numInserted > 0) {
      console.log(`Added ${numInserted} players`);
    }
  } catch (e) {
    console.error(e);
  }
};
