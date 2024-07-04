import { Constants, Maybe, numbers } from '@metafam/utils';
import {
  Player,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragment,
} from 'graphql/autogen/types';

const { BN, amountToDecimal } = numbers;

export const URIRegexp = /^(\w{1,12}:)?(\/\/)\S+/;

// Hours to seconds
export function transformCooldownForBackend(
  cooldown?: Maybe<number>,
  repetition?: Maybe<QuestRepetition_Enum>,
): number | null {
  if (
    !cooldown ||
    !repetition ||
    repetition !== QuestRepetition_Enum.Recurring
  ) {
    return null;
  }
  return cooldown * 60 * 60;
}

export const isAllowedToCreateQuest = (balance?: Maybe<number>): boolean => {
  const { PSEED_FOR_QUEST: pSEEDForQuest } = Constants;
  if (balance == null) return false;
  return balance >= pSEEDForQuest;
};

// TODO factorize this with backend
export function canCompleteQuest(
  quest?: Maybe<QuestWithCompletionFragment>,
  user?: Maybe<Player>,
): boolean {
  if (!user || !quest) return false;

  const {
    status,
    repetition,
    quest_completions: completions,
    cooldown,
  } = quest;

  if (status !== QuestStatus_Enum.Open) {
    return false;
  }
  // Personal or unique, check if not already done by player
  if (
    repetition === QuestRepetition_Enum.Unique ||
    repetition === QuestRepetition_Enum.Personal
  ) {
    return !completions.some((qc) => qc.player.id === user.id);
  }
  if (repetition === QuestRepetition_Enum.Recurring && cooldown) {
    const myLastCompletion = completions.find((qc) => qc.player.id === user.id);
    if (myLastCompletion) {
      const submittedAt = new Date(myLastCompletion.submittedAt);
      const now = new Date();
      const Δ = Number(now) - Number(submittedAt);
      // Δ is in milliseconds, cooldown stored in seconds
      return Δ >= cooldown * 1000;
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
