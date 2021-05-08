import { computeRank as computeRankUtil, computeRankCap } from '@metafam/utils';

import { PlayerRank_Enum } from './autogen/hasura-sdk';

export const RANKS = [
  PlayerRank_Enum.Diamond,
  PlayerRank_Enum.Platinum,
  PlayerRank_Enum.Gold,
  PlayerRank_Enum.Silver,
  PlayerRank_Enum.Bronze,
];

export const PLAYERS_PER_RANK = [7, 7, 7, 14, 21];

export const RANKED_CAP = computeRankCap(PLAYERS_PER_RANK);

// Computes the rank for the given index. This would be the index corresponding
// to all players ordered by total_xp DESC.
export function computeRank(totalRankIndex: number): PlayerRank_Enum | null {
  return computeRankUtil(
    totalRankIndex,
    PLAYERS_PER_RANK,
    RANKS,
  ) as PlayerRank_Enum | null;
}
