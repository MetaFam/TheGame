/* eslint-disable no-console */
import { createDiscordClient } from '@metafam/discord-bot';

import { CONFIG } from '../../config';
import { Player, PlayerRole_Enum } from '../../lib/autogen/hasura-sdk';
import { client } from '../../lib/hasuraClient';
import { TriggerPayload } from './types';

type RoleIds = { [role in PlayerRole_Enum]: string };

export interface UpdateRole {
  playerId: string;
  previousRole: string | undefined;
  newRole: string;
}

export const playerRoleChanged = async (payload: TriggerPayload<Player>) => {
  if (CONFIG.nodeEnv !== 'production') return;

  const { old: oldPlayer, new: newPlayer } = payload.event.data;

  console.log(
    `updateDiscordRole action triggered for player (username=${newPlayer?.username})`,
  );

  try {
    if (newPlayer == null) return;

    const getPlayerResponse = await client.GetPlayer({
      playerId: newPlayer.id,
    });
    const playerDiscordId = getPlayerResponse.player_by_pk?.discord_id;
    if (playerDiscordId == null) return;

    const newRank = newPlayer?.rank;

    if (newRank == null) return;

    // hardcoded for now to metagame discord server
    const guildDiscordId = '629411177947987986';

    // instantiate discord client. We'll need serverId, playerId, and roleIds
    const discordClient = await createDiscordClient();
  } catch (e) {
    console.error(e);
  }
};
