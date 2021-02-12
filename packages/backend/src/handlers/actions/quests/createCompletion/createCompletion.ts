import {
  Quest_Completion_Insert_Input,
  QuestRepetition_Enum,
  QuestStatus_Enum,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';
import { CreateQuestCompletionInput, CreateQuestCompletionOutput } from '../../types';

export async function createCompletion(
  playerId: string,
  questCompletion: CreateQuestCompletionInput,
): Promise<CreateQuestCompletionOutput> {
  const { quest_by_pk: quest } = await client.GetQuestById({ quest_id: questCompletion.quest_id });
  if (!quest) {
    throw new Error('Quest not found');
  }

  if (quest.status !== QuestStatus_Enum.Open) {
    throw new Error('Quest must be open');
  }

  if (quest.repetition === QuestRepetition_Enum.Personal) {
    const { quest_completion_by_pk: existingQuestCompletion } = await client.GetQuestCompletionById({
      player_id: playerId,
      quest_id: questCompletion.quest_id,
    });
    if(existingQuestCompletion) {
      throw new Error('Player already completed this personal quest');
    }
  }

  if (!questCompletion.submission_link && !questCompletion.submission_text) {
    throw new Error('Must provide at least a submission link or text');
  }

  if (quest.repetition === QuestRepetition_Enum.Recurring && quest.cooldown) {
    const { quest_completion: existingQuestCompletions } = await client.GetLastQuestCompletionForPlayer({
      player_id: playerId,
      quest_id: quest.id,
    });
    if(existingQuestCompletions.length > 0) {
      const existingQuestCompletion = existingQuestCompletions[0];
      const submittedAt = new Date(existingQuestCompletion.submitted_at);
      const now = new Date();
      const diff = +now - +submittedAt;
      if(diff/1000 < quest.cooldown) {
        throw new Error('Player have to wait before being able to do this quest again');
      }
    }
  }


  const questCompletionInput: Quest_Completion_Insert_Input = {
    ...questCompletion,
    completed_by_player_id: playerId,
  };
  const createQuestCompletionResult = await client.CreateQuestCompletion({ objects: questCompletionInput });
  const questCompletionCreated = createQuestCompletionResult.insert_quest_completion?.returning[0];
  if(!questCompletionCreated) {
    throw new Error('Error while creating quest completion');
  }

  if (quest.repetition === QuestRepetition_Enum.Unique) {
    const UpdateQuestStatusResult = await client.UpdateQuestStatus({
      quest_id: questCompletion.quest_id,
      status: QuestStatus_Enum.Closed,
    });
    const questStatusUpdated = UpdateQuestStatusResult.update_quest_by_pk;
    if(!questStatusUpdated) {
      throw new Error('Error while setting unique quest status to closed after being completed');
    }
  }

  return {
    success: true,
    quest_id: quest.id,
    completed_by_player_id: playerId,
  };
}

