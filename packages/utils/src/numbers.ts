import BigNumber from 'bignumber.js';

export { BigNumber as BN };

export function amountToInt(amount: string, decimals: number): string {
  return new BigNumber(amount)
    .times(10 ** decimals)
    .dp(0)
    .toFixed();
}

export function amountToDecimal(amount: string, decimals: number): string {
  return new BigNumber(amount).div(10 ** decimals).toFixed();
}

export function truncateNumber(
  n: string,
  roundingMode?: BigNumber.RoundingMode,
  sd: number = SIGNIFICANT_DIGITS,
): string {
  return new BigNumber(n).sd(sd, roundingMode).toFixed();
}

export const SIGNIFICANT_DIGITS = 7;
