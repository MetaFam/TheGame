// A summation of usersPerRank
// This is the first index for which users will NOT be ranked
const computeRankCap = (usersPerRank: Array<number>) =>
  usersPerRank.reduce((sum, rankCount) => {
    return sum + rankCount;
  }, 0);

// Computes the rank for the given index. This would be the index corresponding
// to all players ordered by total_xp DESC.
export function computeRank(
  rankIndex: number,
  usersPerRank: Array<number>,
  ranks: Array<string>,
): string | null {
  const rankCap = computeRankCap(usersPerRank);
  if (rankIndex >= rankCap) return null;
  let indexSum = 0;
  for (let i = 0; i < usersPerRank.length; i++) {
    indexSum += usersPerRank[i];
    if (rankIndex < indexSum && i < ranks.length) {
      return ranks[i];
    }
  }
  return null;
}
