import { Constants, Maybe, numbers } from '@metafam/utils';
import {
  Player,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragment,
} from 'graphql/autogen/types';

const { BN, amountToDecimal } = numbers;

export const URIRegexp = /\w+:(\/\/)?[^\s]+/;

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
