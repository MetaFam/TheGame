import { numbers } from '@metafam/utils';

import {
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragmentFragment,
} from '../graphql/autogen/types';
import { MeType } from '../graphql/types';

const { BN, amountToDecimal } = numbers;

export const UriRegexp = /\w+:(\/?\/?)[^\s]+/;

// Hours to seconds
export function transformCooldown(
  cooldown: number | undefined | null,
  repetition: QuestRepetition_Enum | undefined | null,
) {
  if (!cooldown || !repetition || repetition === QuestRepetition_Enum.Recurring)
    return null;
  return cooldown * 60 * 60;
}

export function isAllowedToCreateQuest(balance?: string): boolean {
  if (!balance) return false;

  const pSEEDDecimals = 18;
  const minimumPooledSeedBalance = new BN(100);
  const pSEEDBalanceInDecimal = amountToDecimal(balance, pSEEDDecimals);

  const allowed = new BN(pSEEDBalanceInDecimal).gt(minimumPooledSeedBalance);

  return allowed;
}

// TODO factorize this with backend
export function canCompleteQuest(
  quest: QuestWithCompletionFragmentFragment | null | undefined,
  user: MeType | null | undefined,
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
    // TODO
  }

  return true;
}
