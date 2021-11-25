import BN from 'bignumber.js';

export { BN };

export function amountToInt(amount: string, decimals: number): string {
  return new BN(amount)
    .times(10 ** decimals)
    .dp(0)
    .toFixed();
}

export function amountToDecimal(amount: string, decimals: number): string {
  return new BN(amount).div(10 ** decimals).toFixed();
}

export function truncateNumber(
  n: string,
  roundingMode?: BN.RoundingMode,
  sd: number = SIGNIFICANT_DIGITS,
): string {
  return new BN(n).sd(sd, roundingMode).toFixed();
}

export const SIGNIFICANT_DIGITS = 7;
