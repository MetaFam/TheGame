import { Constants } from '@metafam/utils';
import { PlayerRank_Enum, TokenBalancesFragment } from 'graphql/autogen/types';
import { Patron } from 'graphql/types';

export const PATRON_RANKS = [
  PlayerRank_Enum.Diamond,
  PlayerRank_Enum.Platinum,
  PlayerRank_Enum.Gold,
  PlayerRank_Enum.Silver,
  PlayerRank_Enum.Bronze,
];

export const PATRONS_PER_RANK = [7, 7, 7, 14, 21];

export const NUM_PATRONS = 150;
export const MIN_PATRON_PSEEDS = 8;

export const getLeagueCount = (rank: PlayerRank_Enum) => {
  const index = PATRON_RANKS.findIndex((patronRank) => patronRank === rank);
  return PATRONS_PER_RANK[index];
};

export const getLeagueCutoff = (
  rank: PlayerRank_Enum,
  pSeedHolders: TokenBalancesFragment[],
  pSeedPrice: number,
) => {
  if (pSeedHolders == null || pSeedHolders.length === 0) {
    return 0;
  }
  const leagueIndex = PATRON_RANKS.findIndex(
    (patronRank) => patronRank === rank,
  );
  // this is the patron in the league with the least amount of holdings
  const indexOfLastPatronInLeague =
    PATRONS_PER_RANK.reduce(
      (total, leagueCount, index) =>
        leagueIndex < index ? total : total + leagueCount,
      0,
    ) - 1;
  const pSeedCutoff =
    pSeedHolders.length <= indexOfLastPatronInLeague
      ? MIN_PATRON_PSEEDS
      : parseFloat(pSeedHolders[indexOfLastPatronInLeague].pSeedBalance) /
        Constants.PSEED_CONTRACT_DIVISOR;

  return pSeedCutoff * pSeedPrice;
};

export const getPatronHoldingsUsd = (
  pSeedHolder: TokenBalancesFragment,
  pSeedPrice: number,
) => {
  const pSeedBalance =
    parseFloat(pSeedHolder.pSeedBalance) / Constants.PSEED_CONTRACT_DIVISOR;
  return pSeedBalance * pSeedPrice;
};
