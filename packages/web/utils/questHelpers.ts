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

export const isAllowedToCreateQuest = (balance?: string | null): boolean => {
  let bal = balance;
  bal ??= '0';

  const { PSEED_DECIMALS: pSEEDDecimals, PSEED_FOR_QUEST: pSEEDForQuest } =
    Constants;
  const minPSEEDBalance = new BN(pSEEDForQuest);
  const decimalPSEEDBalance = amountToDecimal(bal, pSEEDDecimals);

  return new BN(decimalPSEEDBalance).gte(minPSEEDBalance);
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
      // Δ is in milliseconds, cooldown in hours
      if (Δ < cooldown * 60 * 60 * 1000) {
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
