import {
  Quest_Insert_Input,
  QuestRepetition_Enum,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';
import { CreateQuestInput, CreateQuestOutput } from '../../types';
import { isAllowedToCreateQuest } from './permissions';

export async function createQuest(
  playerId: string,
  quest: CreateQuestInput,
): Promise<CreateQuestOutput> {

  // CreateQuestInput.repetition is a string because hasura custom actions cannot use types from the database
  if (quest.repetition === QuestRepetition_Enum.Recurring && !quest.cooldown) {
    throw new Error('Recurring quests need to have a cooldown');
  }
  if (quest.repetition !== QuestRepetition_Enum.Recurring && quest.cooldown) {
    throw new Error('Not recurring quests cannot have cooldown');
  }

  const playerData = await client.GetPlayer({ playerId });
  const ethAddress = playerData.player_by_pk?.ethereum_address;
  if (!ethAddress) {
    throw new Error('Ethereum address not found for');
  }

  const allowed = await isAllowedToCreateQuest(ethAddress);
  if (!allowed) {
    throw new Error('User not allowed to create quests');
  }

  const questInput: Quest_Insert_Input = {
    ...quest,
    repetition: quest.repetition,
    created_by_player_id: playerId,
  };

  const data = await client.CreateQuest({ objects: questInput });

  return {
    success: true,
    quest_id: data.insert_quest?.returning[0].id,
  };
}

