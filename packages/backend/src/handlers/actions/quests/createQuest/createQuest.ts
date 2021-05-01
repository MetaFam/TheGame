import {
  CreateQuestInput,
  CreateQuestOutput,
  Quest_Insert_Input,
  QuestRepetition_Enum,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';
import { isAllowedToCreateQuest } from './permissions';

export async function createQuest(
  playerId: string,
  quest: CreateQuestInput,
): Promise<CreateQuestOutput> {
  // Workaround as Hasura can't share enums between root schema and custom actions
  const questRepetition = quest.repetition as
    | QuestRepetition_Enum
    | null
    | undefined;

  if (questRepetition === QuestRepetition_Enum.Recurring && !quest.cooldown) {
    throw new Error('Recurring quests need to have a cooldown');
  }
  if (questRepetition !== QuestRepetition_Enum.Recurring && quest.cooldown) {
    throw new Error('Non recurring quests cannot have a cooldown');
  }

  const playerData = await client.GetPlayer({ playerId });
  const ethAddress = playerData.player_by_pk?.ethereum_address;
  if (!ethAddress) {
    throw new Error('Ethereum address not found for player');
  }

  const allowed = await isAllowedToCreateQuest(ethAddress);
  if (!allowed) {
    throw new Error('Player not allowed to create quests');
  }

  const { skills_id: skillsId, ...questValues } = quest;

  const questInput: Quest_Insert_Input = {
    ...questValues,
    repetition: questRepetition,
    created_by_player_id: playerId,
    quest_skills: {
      data: skillsId.map((s) => ({ skill_id: s })),
    },
  };

  const data = await client.CreateQuest({ objects: questInput });

  return {
    success: true,
    quest_id: data.insert_quest?.returning[0].id,
  };
}
