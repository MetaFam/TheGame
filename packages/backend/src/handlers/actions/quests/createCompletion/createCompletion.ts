import {
  CreateQuestCompletionInput,
  CreateQuestCompletionOutput,
  Quest_Completion_Insert_Input,
  QuestRepetition_Enum,
  QuestStatus_Enum,
} from '../../../../lib/autogen/hasura-sdk.js';
import { client } from '../../../../lib/hasuraClient.js';

export async function createCompletion(
  playerId: string,
  questCompletion: CreateQuestCompletionInput,
): Promise<CreateQuestCompletionOutput> {
  if (!questCompletion.submissionLink && !questCompletion.submissionText) {
    throw new Error('Must provide at least a submission link or text');
  }

  const { quest_by_pk: quest } = await client.GetQuestById({
    questId: questCompletion.questId,
  });
  if (!quest) {
    throw new Error('Quest not found.');
  }

  if (quest.status !== QuestStatus_Enum.Open) {
    throw new Error('Quest must be open.');
  }

  // Personal or unique, check if not already done by player
  if (
    quest.repetition === QuestRepetition_Enum.Unique ||
    quest.repetition === QuestRepetition_Enum.Personal
  ) {
    const { quest_completion: existingQuestCompletions } =
      await client.GetQuestCompletions({
        playerId,
        questId: questCompletion.questId,
      });
    if (existingQuestCompletions.length > 0) {
      throw new Error(
        'You already submitted a completion this personal/unique quest',
      );
    }
  }

  // Recurring, check if not already done by player within cooldown
  if (quest.repetition === QuestRepetition_Enum.Recurring && quest.cooldown) {
    const { quest_completion: existingQuestCompletions } =
      await client.GetLastQuestCompletionForPlayer({
        playerId,
        questId: quest.id,
      });
    if (existingQuestCompletions.length > 0) {
      const existingQuestCompletion = existingQuestCompletions[0];
      const submittedAt = new Date(existingQuestCompletion.submittedAt);
      const now = new Date();
      const diff = +now - +submittedAt;
      if (diff < quest.cooldown * 1000) {
        throw new Error(
          'Player have to wait before being able to do this quest again',
        );
      }
    }
  }

  const questCompletionInput: Quest_Completion_Insert_Input = {
    ...questCompletion,
    completedByPlayerId: playerId,
  };
  const createQuestCompletionResult = await client.CreateQuestCompletion({
    objects: questCompletionInput,
  });
  const questCompletionCreated =
    createQuestCompletionResult.insert_quest_completion?.returning[0];
  if (!questCompletionCreated) {
    throw new Error('Error while completing quest');
  }

  return {
    success: true,
    quest_completion_id: questCompletionCreated.id,
  };
}
