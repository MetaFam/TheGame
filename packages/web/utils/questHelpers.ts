import { Constants, Maybe, numbers } from '@metafam/utils';
import {
  Player,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragment,
} from 'graphql/autogen/types';

const { BN, amountToDecimal } = numbers;

export const URIRegexp = /\w+:(\/\/)?[^\s]+/;

export async function uploadQuestImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  const result = await fetch(`/api/storage`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  const response = await result.json();
  const { error } = response;
  if (result.status >= 400 || error) {
    throw new Error(
      `web3.storage ${result.status} response: "${error ?? result.statusText}"`,
    );
  }
  return `ipfs://${response.image}`;
}

// Hours to seconds
export function transformCooldownForBackend(
  cooldown?: number | null,
  repetition?: QuestRepetition_Enum | null,
): number | null {
  if (!cooldown || !repetition || repetition !== QuestRepetition_Enum.Recurring)
    return null;
  return cooldown * 60 * 60;
}

export function isAllowedToCreateQuest(balance?: string | null): boolean {
  if (balance == null) return false;

  const pSEEDDecimals = 18;
  const minimumPooledSeedBalance = new BN(Constants.PSEED_FOR_QUEST);
  const pSEEDBalanceInDecimal = amountToDecimal(balance, pSEEDDecimals);

  const allowed = new BN(pSEEDBalanceInDecimal).gte(minimumPooledSeedBalance);

  return allowed;
}

// TODO factorize this with backend
export function canCompleteQuest(
  quest?: Maybe<QuestWithCompletionFragment>,
  user?: Maybe<Player>,
): boolean {
  if (!user || !quest) return false;

  if (quest.status !== QuestStatus_Enum.Open) {
    return false;
  }
  // Personal or unique, check if not already done by player
  if (
    quest.repetition === QuestRepetition_Enum.Unique ||
    quest.repetition === QuestRepetition_Enum.Personal
  ) {
    return !quest.quest_completions.some((qc) => qc.player.id === user.id);
  }
  if (quest.repetition === QuestRepetition_Enum.Recurring && quest.cooldown) {
    const myLastCompletion = quest.quest_completions.find(
      (qc) => qc.player.id === user.id,
    );
    if (myLastCompletion) {
      const submittedAt = new Date(myLastCompletion.submittedAt);
      const now = new Date();
      const diff = +now - +submittedAt;
      if (diff < quest.cooldown * 1000) {
        return false;
      }
    }
  }

  return true;
}

export const QuestRepetitionHint = {
  [QuestRepetition_Enum.Recurring]:
    'Recurring quests can be done multiple time per player after a cooldown.',
  [QuestRepetition_Enum.Personal]:
    'Personal quests can be done once per player',
  [QuestRepetition_Enum.Unique]: 'Unique quests can be done only once',
} as const;
