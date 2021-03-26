import { numbers } from '@metafam/utils';

const { BN, amountToDecimal } = numbers;

export const UriRegexp = /\w+:(\/?\/?)[^\s]+/

export function isAllowedToCreateQuest(
  balance?: string,
): boolean {
  if(!balance) return false;

  const pSEEDDecimals = 18;
  const minimumPooledSeedBalance = new BN(100);
  const pSEEDBalanceInDecimal = amountToDecimal(
    balance,
    pSEEDDecimals,
  );

  const allowed = new BN(pSEEDBalanceInDecimal).gt(minimumPooledSeedBalance);

  return allowed;
}
