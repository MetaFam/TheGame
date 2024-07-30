export function amountToInt(amount: string, decimals: number) {
  return Number(BigInt(amount) * (10n ** BigInt(decimals))).toFixed();
}

export function amountToDecimal(amount: string, decimals: number) {
  return Number(BigInt(amount) / (10n ** BigInt(decimals))).toFixed();
}

export const SIGNIFICANT_DIGITS = 7;

export function truncateNumber(
  n: string,
  sigfig: number = SIGNIFICANT_DIGITS,
) {
  return Number(n).toFixed(sigfig);
}

