/* eslint-disable no-console */
import { createDiscordClient } from '@metafam/discord-bot';

import { AccountType_Enum, Player, PlayerRank_Enum } from '../../lib/autogen/hasura-sdk';
import { client } from '../../lib/hasuraClient';
import { TriggerPayload } from './types';

type RankRoleIds = {[rank in PlayerRank_Enum]: string};

export interface UpdateRole {
  playerId: string;
  previousRole: string | undefined;
  newRole: string;
}

export const updateDiscordRole = async (
  payload: TriggerPayload<Player>,
) => {
  const { old: oldPlayer, new: newPlayer } = payload.event.data;

  try {
    if (newPlayer == null) return;
   
    const getPlayerResponse = await client.GetPlayer({ playerId: newPlayer.id });
    const discordPlayerAccount = getPlayerResponse.player_by_pk?.Accounts?.find(a => a.type === AccountType_Enum.Discord);
    if (discordPlayerAccount?.identifier == null) return;

    const newRank = newPlayer?.rank;

    if (newRank == null) return;
   
    // look up guild by guildname = 'metagame' (for now), 
    const getGuildResponse = await client.GetGuild({ guildname: 'metafam' });
    const discordGuildAccount = getGuildResponse.guild[0]?.guild_accounts?.find(a => a.type === AccountType_Enum.Discord);
    if (discordGuildAccount == null) return;

    // instantiate discord client. We'll need serverId, playerId, and roleIds
    const discordClient = await createDiscordClient();

    const guild = await discordClient.guilds.fetch(discordGuildAccount.identifier);
    if (guild == null) {
      console.warn(`No discord server found matching ${discordGuildAccount.identifier}!`);
      return;
    }

    const rankDiscordRoleIds = getGuildResponse.guild[0]?.discord_metadata?.rankRoleIds as RankRoleIds;

    const discordPlayer = await guild.members.fetch(discordPlayerAccount.identifier);
    if (discordPlayer == null) {
      console.warn(`No discord player with ID ${discordPlayerAccount.identifier} found in server ${guild.name}!`);
      return;
    }

    // We know the old value; try to remove that role
    let removedRole : PlayerRank_Enum | null = null;
    if (oldPlayer?.rank != null) {
      // this is just a no-op if the player doesn't actually have the role
      const success = await discordPlayer.roles.cache.delete(rankDiscordRoleIds[oldPlayer.rank]);
      if (success) {
        removedRole = oldPlayer.rank;
      }
    }
    // if not successful, attempt to remove all rank roles
    if (removedRole == null) {
      // eslint-disable-next-line no-restricted-syntax
      for (const rank in rankDiscordRoleIds) {
        if (Object.prototype.hasOwnProperty.call(rankDiscordRoleIds, rank)) {
          // eslint-disable-next-line no-await-in-loop
          const success = await discordPlayer.roles.cache.delete(rankDiscordRoleIds[rank as PlayerRank_Enum]);
          if (success) {
            removedRole = rank as PlayerRank_Enum;
            break;
          }
        }
  
      }
    }

    if (removedRole) {
      console.log(`Removed role ${removedRole} for player ${newPlayer?.username} in discord`);
    }
    
    // Add the new rank.
    const discordRoleForRank = rankDiscordRoleIds[newRank];
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
