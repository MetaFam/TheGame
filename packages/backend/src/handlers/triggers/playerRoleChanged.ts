/* eslint-disable no-console */
import {
  createDiscordClient,
  GuildDiscordMetadata,
} from '@metafam/discord-bot';
import { Constants } from '@metafam/utils';

import { CONFIG } from '../../config';
import { Player_Role } from '../../lib/autogen/hasura-sdk';
import { client } from '../../lib/hasuraClient';
import { TriggerPayload } from './types';

type RoleIds = { [role: string]: string };

export interface UpdateRole {
  playerId: string;
  previousRole: string | undefined;
  newRole: string;
}

export const playerRoleChanged = async (
  payload: TriggerPayload<Player_Role>,
) => {
  if (CONFIG.nodeEnv !== 'production') return;

  const { old: oldPlayerRole, new: newPlayerRole } = payload.event.data;

  const playerId = newPlayerRole?.player_id || oldPlayerRole?.player_id;

  try {
    const getPlayerResponse = await client.GetPlayer({
      playerId,
    });
    const playerDiscordId = getPlayerResponse.player_by_pk?.discord_id;
    const playerUsername = getPlayerResponse.player_by_pk?.username;
    if (playerDiscordId == null) return;

    // instantiate discord client. We'll need serverId, playerId, and roleIds
    const discordClient = await createDiscordClient();

    const guild = await discordClient.guilds.fetch(
      Constants.METAFAM_DISCORD_GUILD_ID,
      true,
      true,
    );
    if (guild == null) {
      return;
    }

    const getGuildResponse = await client.GetGuildMetadataByDiscordId({
      discordId: Constants.METAFAM_DISCORD_GUILD_ID,
    });
    const metadata: GuildDiscordMetadata =
      getGuildResponse.guild_metadata[0]?.discord_metadata;
    const roleIds = metadata.playerRoles as RoleIds;

    const discordPlayer = await guild.members.fetch(playerDiscordId);
    if (discordPlayer == null) {
      console.warn(
        `No discord player with ID ${playerDiscordId} found in server ${guild.name}!`,
      );
      return;
    }

    if (oldPlayerRole != null && newPlayerRole == null) {
      const roleId = roleIds[oldPlayerRole.role];
      // this throws a typeerror if the player doesn't actually have the role
      const success = await discordPlayer.roles.remove(roleId);
      if (success) {
        console.debug(
          `Removed role ${oldPlayerRole.role} for player ${playerUsername}`,
        );
      }
    } else if (oldPlayerRole == null && newPlayerRole != null) {
      const roleId = roleIds[newPlayerRole.role];
      console.log(roleId);
      const success = await discordPlayer.roles.add([roleId]);
      if (success) {
        console.debug(
          `Added role ${newPlayerRole.role} for player ${playerUsername}`,
        );
      }
    }
  } catch (e) {
    console.error(e);
  }
};
