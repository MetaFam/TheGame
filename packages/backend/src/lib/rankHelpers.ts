import { PlayerRank_Enum } from './autogen/hasura-sdk';

export const RANKS = [
  PlayerRank_Enum.Diamond,
  PlayerRank_Enum.Platinum,
  PlayerRank_Enum.Gold,
  PlayerRank_Enum.Silver,
  PlayerRank_Enum.Bronze
]

export const PLAYERS_PER_RANK = [7, 7, 7, 14, 21];

// A summation of PLAYERS_PER_RANK.
// This is the first index for which players will NOT be ranked, e.g.
// the 56th player will be Bronze, and the 57th player will not be ranked.
export const RANKED_CAP: number = PLAYERS_PER_RANK.reduce((sum, rankCount) => {
  return sum + rankCount;
}, 0);

// Computes the rank for the given index. This would be the index corresponding
// to all players ordered by total_xp DESC.
export function computeRank(totalRankIndex: number): PlayerRank_Enum | null {
  if (totalRankIndex >= RANKED_CAP) return null;
  let indexSum = 0;
  for (let i = 0; i < PLAYERS_PER_RANK.length; i++) {
    indexSum += PLAYERS_PER_RANK[i];
    if (totalRankIndex < indexSum) {
      return RANKS[i];
    }
  }
  return null;
}
