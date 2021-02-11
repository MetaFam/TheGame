import {
  Quest_Insert_Input,
  QuestRepetition_Enum,
} from '../../../lib/autogen/hasura-sdk';
import { getClient } from '../../../lib/hasuraClient';
import { CreateQuestInput, CreateQuestOutput } from '../types';

export async function createQuest(
  playerId: string,
  quest: CreateQuestInput,
): Promise<CreateQuestOutput> {
  const client = getClient();

  if (quest.repetition && !(quest.repetition in QuestRepetition_Enum)) {
    throw new Error('Invalid recurring option');
  }
  if (quest.repetition === QuestRepetition_Enum.Recurring && !quest.cooldown) {
    throw new Error('Recurring quests need to have a cooldown');
  }

  // TODO: check if:
  // creator holds more than 100 pSEED

  const questInput: Quest_Insert_Input = {
    ...quest,
    repetition: quest.repetition
      ? (quest.repetition as QuestRepetition_Enum)
      : null,
    created_by_player_id: playerId,
  };

  const data = await client.CreateQuest({ objects: questInput });

  return {
    success: true,
    quest_id: data.insert_quest?.returning[0].id,
  };
}
