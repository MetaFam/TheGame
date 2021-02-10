import { CreateQuestMutationVariables } from '../../../lib/autogen/hasura-sdk';
import { getClient } from '../../../lib/hasuraClient';
import { QuestCreateOutput } from '../types';

export async function createQuest(
  playerId: string,
  input: CreateQuestMutationVariables,
): Promise<QuestCreateOutput> {
  const client = getClient({
    role: 'player',
    backendOnly: true,
    userId: playerId,
  });

  // TODO: check if:
  // creator holds more than 100 pSEED

  const data = await client.CreateQuest(input);

  return {
    quest_id: data.insert_quest?.returning[0].id,
  };
}
