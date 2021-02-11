import { UpdateRole } from '@metafam/discord-bot';

import { AccountType_Enum, Player } from '../../lib/autogen/hasura-sdk';
import { TriggerPayload } from './types';

export const updateDiscordRole = async (
  payload: TriggerPayload<Player>,
) => {
  const {old: oldPlayer, new: newPlayer} = payload.event.data;

  const discordPlayerAccount = newPlayer?.Accounts.find(a => a.type === AccountType_Enum.Discord);

  if (discordPlayerAccount?.identifier == null) return;

  const newRank = newPlayer?.rank;

  if (newRank == null) return;

  const discordPayload: UpdateRole = {
    previousRole: oldPlayer?.rank?.toString(),
    newRole: newRank
  }
  // todo call API in discord-bot repo 
};
