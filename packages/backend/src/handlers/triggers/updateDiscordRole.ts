/* eslint-disable no-console */
import { createDiscordClient } from '@metafam/discord-bot';
import { Role } from 'discord.js';

import { AccountType_Enum, Player, PlayerRank_Enum } from '../../lib/autogen/hasura-sdk';
import { client } from '../../lib/hasuraClient';
import { TriggerPayload } from './types';

export interface UpdateRole {
  playerId: string;
  previousRole: string | undefined;
  newRole: string;
}

export const updateDiscordRole = async (
  payload: TriggerPayload<Player>,
) => {
  const {old: oldPlayer, new: newPlayer} = payload.event.data;

  try {
    if (newPlayer == null) return;
   
    const getPlayerResponse = await client.GetPlayer({playerId: newPlayer.id});
    const discordPlayerAccount = getPlayerResponse.player_by_pk?.Accounts?.find(a => a.type === AccountType_Enum.Discord);
    if (discordPlayerAccount?.identifier == null) return;

    const newRank = newPlayer?.rank;

    if (newRank == null) return;
   
    // look up guild by guildname = 'metagame' (for now), 
    const getGuildResponse = await client.GetGuild({guildname: 'metafam'});
    const discordGuildAccount = getGuildResponse.guild[0]?.guild_accounts?.find(a => a.type === AccountType_Enum.Discord);
    if (discordGuildAccount == null) return;

    // instantiate discord client. We'll need serverId, playerId, and roleIds
    const discordClient = await createDiscordClient();

    // todo add jsonb field to guild and populate ranks, e.g. { ranks: [] }
    const guild = await discordClient.guilds.fetch(discordGuildAccount.identifier);
    if (guild == null) {
      console.warn(`No discord server found matching ${discordGuildAccount.identifier}!`);
      return;
    }

    // since we don't have roleIds, we'll need to look up the roles in the server 
    // and just match by strings for the time being.
    // https://discord.com/developers/docs/resources/guild#get-guild-roles
    const rankDiscordRoles = new Map<PlayerRank_Enum, Role>();

    const discordRoleManager = await guild.roles.fetch();
    discordRoleManager.cache.forEach(discordRole => {
      const rankMatch = Object.values(PlayerRank_Enum).find(rank => {
        return rank.toUpperCase() === discordRole.name.toUpperCase();
      }); 
      if (rankMatch != null) {
        rankDiscordRoles.set(rankMatch, discordRole);
      }
    })

    const discordPlayer = await guild.members.fetch(discordPlayerAccount.identifier);
    if (discordPlayer == null) {
      console.warn(`No discord player with ID ${discordPlayerAccount.identifier} found in server ${guild.name}!`);
      return;
    }

    // if there's an oldRank, delete it.
    const previousRank = oldPlayer?.rank;
    if (previousRank != null) {
      const discordRoleForRank = rankDiscordRoles.get(previousRank);
      if (discordRoleForRank == null) {
        console.warn(`discord role associated with ${previousRank} was not found!`);
      } else {
        // this is just a no-op if the player doesn't actually have the role
        await discordPlayer.roles.remove(discordRoleForRank);
        console.log(`Removed role ${previousRank} for player ${newPlayer?.username} in discord`);
      }
    }
  
    // Add the new rank.
    const discordRoleForRank = rankDiscordRoles.get(newRank);
    if (discordRoleForRank == null) {
      console.warn(`discord role associated with ${newRank} was not found!`);
    } else {
      await discordPlayer.roles.add(discordRoleForRank);
      console.log(`Added role ${newRank} for player ${newPlayer?.username} in discord`);
    }

  } catch (e) {
    console.error(e);
  }
};
