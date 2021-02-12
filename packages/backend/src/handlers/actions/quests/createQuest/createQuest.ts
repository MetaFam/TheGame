import { numbers } from '@metafam/utils';

import {
  Quest_Insert_Input,
  QuestRepetition_Enum,
} from '../../../../lib/autogen/hasura-sdk';
import { getERC20Contract } from '../../../../lib/ethereum';
import { client } from '../../../../lib/hasuraClient';
import { CreateQuestInput, CreateQuestOutput } from '../../types';

const { BN, amountToDecimal } = numbers;

async function isAllowedToCreateQuest(playerAddress: string): Promise<boolean> {
  const pSEEDContractAddress = '0x34a01c0a95b0592cc818cd846c3cf285d6c85a31';
  const pSEEDContract = getERC20Contract(pSEEDContractAddress);
  const pSEEDBalance = await pSEEDContract.balanceOf(playerAddress);
  const pSEEDDecimals = await pSEEDContract.decimals();
  const minimumPooledSeedBalance = new BN(100);
  const pSEEDBalanceInDecimal = amountToDecimal(pSEEDBalance, pSEEDDecimals);

  const allowed = new BN(pSEEDBalanceInDecimal).gt(minimumPooledSeedBalance);

  return allowed;
}

export async function createQuest(
  playerId: string,
  quest: CreateQuestInput,
): Promise<CreateQuestOutput> {


  if (quest.repetition && !((Object.values(QuestRepetition_Enum) as string[]).includes(quest.repetition))) {
    throw new Error('Invalid repetition option');
  }
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
    repetition: (quest.repetition as QuestRepetition_Enum) ?? null,
    created_by_player_id: playerId,
  };

  const data = await client.CreateQuest({ objects: questInput });

  return {
    success: true,
    quest_id: data.insert_quest?.returning[0].id,
  };
}
