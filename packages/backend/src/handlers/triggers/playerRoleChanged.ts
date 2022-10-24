/* eslint-disable no-console */
import {
  createDiscordClient,
  GuildDiscordMetadata,
} from '@metafam/discord-bot';
import { Constants } from '@metafam/utils';
import { CONFIG } from 'config';
import { Player_Role } from 'lib/autogen/hasura-sdk';
import { client } from 'lib/hasuraClient';

import { TriggerPayload } from './types.js';

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

  const { old: oldRole, new: newRole } = payload.event.data;

  const playerId = newRole?.player_id || oldRole?.player_id;

  try {
    const { player_by_pk: playerByPK } = await client.GetPlayer({ playerId });
    const { discordId } = playerByPK ?? {};
    const { username } = playerByPK?.profile ?? {};

    if (discordId == null) return;

    // instantiate discord client. We'll need serverId, playerId, and roleIds
    const discordClient = await createDiscordClient();

    const guild = await discordClient.guilds.fetch(
      Constants.METAFAM_DISCORD_GUILD_ID,
    );
    if (guild == null) {
      return;
    }

    const getGuildResponse = await client.GetGuildMetadataByDiscordId({
      discordId: Constants.METAFAM_DISCORD_GUILD_ID,
    });
    const metadata: GuildDiscordMetadata =
      getGuildResponse.guild[0]?.metadata?.discordMetadata;
    const roleIds = metadata.playerRoles as RoleIds;

    const discordPlayer = await guild.members.fetch(discordId);
    if (discordPlayer == null) {
      console.warn(
        `No discord player with ID ${discordId} found in server ${guild.name}!`,
      );
      return;
    }

    if (oldRole != null && newRole == null) {
      const roleId = roleIds[oldRole.role];
      // this throws a typeerror if the player doesn't actually have the role
      const success = await discordPlayer.roles.remove(roleId);
      if (success) {
        console.debug(`Removed role ${oldRole.role} for player ${username}`);
      }
    } else if (oldRole == null && newRole != null) {
      const roleId = roleIds[newRole.role];
      console.log(roleId);
      const success = await discordPlayer.roles.add([roleId]);
      if (success) {
        console.debug(`Added role ${newRole.role} for player ${username}`);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
