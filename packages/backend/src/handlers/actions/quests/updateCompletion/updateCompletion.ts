import {
  QuestCompletionStatus_Enum,
  QuestRepetition_Enum,
  QuestStatus_Enum,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';
import { UpdateQuestCompletionInput, UpdateQuestCompletionOutput } from '../../types';

export async function updateCompletion(
  playerId: string,
  updateData: UpdateQuestCompletionInput,
): Promise<UpdateQuestCompletionOutput> {

  const { quest_by_pk: quest } = await client.GetQuestById({ quest_id: updateData.quest_id });
  if (!quest) {
    throw new Error('Quest not found');
  }
  if (quest.status !== QuestStatus_Enum.Open) {
    throw new Error('Quest must be open');
  }
  if (quest.created_by_player_id !== playerId) {
    throw new Error('Only quest creator can update a completion');
  }

  const { quest_completion_by_pk: questCompletion } = await client.GetQuestCompletionById({ quest_completion_id: updateData.quest_completion_id });
  if (!questCompletion) {
    throw new Error('Quest completion not found');
  }
  if (questCompletion.status !== QuestCompletionStatus_Enum.Pending) {
    throw new Error('Quest have been already marked as done');
  }

  const updateQuestCompletionResult = await client.UpdateQuestCompletionStatus({
    quest_completion_id: quest.id,
    status: updateData.status as QuestCompletionStatus_Enum,
  });
  const questCompletionCreated = updateQuestCompletionResult.update_quest_completion_by_pk;
  if(!questCompletionCreated) {
    throw new Error('Error while updating quest completion');
  }

  if (quest.repetition === QuestRepetition_Enum.Unique) {
    const updateQuestStatusResult = await client.UpdateQuestStatus({
      quest_id: quest.id,
      status: QuestStatus_Enum.Closed,
    });
    const questStatusUpdated = updateQuestStatusResult.update_quest_by_pk;
    if(!questStatusUpdated) {
      throw new Error('Error while setting unique quest status to closed after being completed');
    }
  }

  return {
    success: true,
  };
}

