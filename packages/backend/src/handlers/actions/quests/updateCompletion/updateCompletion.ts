import { createDiscordClient } from '@metafam/discord-bot';
import { Constants } from '@metafam/utils';
import { CONFIG } from 'config';
import { TextChannel } from 'discord.js';

import {
  QuestCompletionStatus_ActionEnum,
  QuestCompletionStatus_Enum,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  UpdateQuestCompletionInput,
  UpdateQuestCompletionOutput,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';

export async function updateCompletion(
  playerId: string,
  updateData: UpdateQuestCompletionInput,
): Promise<UpdateQuestCompletionOutput> {
  const { quest_completion_by_pk: questCompletion } =
    await client.GetQuestCompletionById({
      quest_completion_id: updateData.questCompletionId,
    });
  if (!questCompletion) {
    throw new Error('Quest completion not found');
  }
  const { quest_by_pk: quest } = await client.GetQuestById({
    questId: questCompletion.questId,
  });
  if (!quest) {
    throw new Error('Quest not found');
  }

  if (quest.status !== QuestStatus_Enum.Open) {
    throw new Error('Quest must be open');
  }
  if (quest.createdByPlayerId !== playerId) {
    throw new Error('Only quest creator can update a completion');
  }
  if (questCompletion.status !== QuestCompletionStatus_Enum.Pending) {
    throw new Error('Quest completion already marked as done');
  }

  // Workaround as Hasura can't share enums between root schema and custom actions
  const newQuestCompletionStatus =
    updateData.status === QuestCompletionStatus_ActionEnum.Accepted
      ? QuestCompletionStatus_Enum.Accepted
      : QuestCompletionStatus_Enum.Rejected;

  const updateQuestCompletionResult = await client.UpdateQuestCompletionStatus({
    quest_completion_id: questCompletion.id,
    status: newQuestCompletionStatus,
  });
  const questCompletionUpdated =
    updateQuestCompletionResult.update_quest_completion_by_pk;
  if (!questCompletionUpdated) {
    throw new Error('Error while updating quest completion');
  }

  if (
    newQuestCompletionStatus === QuestCompletionStatus_Enum.Accepted &&
    quest.repetition === QuestRepetition_Enum.Unique
  ) {
    const updateQuestStatusResult = await client.UpdateQuestStatus({
      quest_id: quest.id,
      status: QuestStatus_Enum.Closed,
    });
    const questStatusUpdated = updateQuestStatusResult.update_quest_by_pk;
    if (!questStatusUpdated) {
      throw new Error(
        'Error while setting unique quest status to closed after being completed',
      );
    }
    await client.RejectOtherQuestCompletions({
      accepted_quest_completion_id: questCompletion.id,
      questId: quest.id,
    });
  }

  if (newQuestCompletionStatus === QuestCompletionStatus_Enum.Accepted) {
    sendDiscordProps(
      questCompletion.completedByPlayerId,
      quest.id,
      quest.title,
    );
  }

  return {
    success: true,
    quest_completion_id: questCompletion.id,
  };
}

async function sendDiscordProps(
  playerId: string,
  questId: string,
  questName: string,
): Promise<void> {
  const getPlayerResponse = await client.GetPlayer({
    playerId,
  });
  const playerDiscordId = getPlayerResponse.player_by_pk?.discordId;

  const discordClient = await createDiscordClient();

  const guild = await discordClient.guilds.fetch(
    Constants.METAFAM_DISCORD_GUILD_ID,
  );
  if (guild == null || playerDiscordId == null) {
    return;
  }
  const discordPlayer = await guild.members.fetch(playerDiscordId);
  if (discordPlayer == null) {
    const player = getPlayerResponse.player_by_pk?.profile?.username;
    console.warn(
      `Player ${player} was not found in the MetaGame discord server, so we couldn't give props!`,
    );
    return;
  }

  const propsChannel = (await discordClient.channels.fetch(
    Constants.METAFAM_DISCORD_PROPS_CHANNEL_ID,
  )) as TextChannel;
  const link = `${CONFIG.frontendURL}/quest/${questId}`;
  propsChannel.send(
    `Props to ${discordPlayer} for completing ${questName}! Check it out here: ${link}`,
  );
}
