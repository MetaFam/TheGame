import fetch from 'node-fetch';

import { AccountType_Enum, Player } from '../../lib/autogen/hasura-sdk';
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

  const discordPlayerAccount = newPlayer?.Accounts.find(a => a.type === AccountType_Enum.Discord);

  if (discordPlayerAccount?.identifier == null) return;

  const newRank = newPlayer?.rank;

  if (newRank == null) return;

  const discordPayload: UpdateRole = {
    playerId: newPlayer?.id,
    previousRole: oldPlayer?.rank?.toString(),
    newRole: newRank
  }
  // look up guild by guildname = 'metagame' (for now), 
  // then look up guild_account for DISCORD type
  // will need to create new graphql queries for these (can they be joined into one?)


  // call discord API. for each query we'll need serverId, playerId, and roleId
  // since we don't have roleIds, we'll need to look up the roles in the server 
  // and just match by strings for the time being.
  // https://discord.com/developers/docs/resources/guild#get-guild-roles

  // if there's an oldRank, delete it.
  // if there's a new rank, add it 
  fetch()
};
