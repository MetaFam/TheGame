import { numbers } from '@metafam/utils';

import { getERC20Contract } from '../../../../lib/ethereum';

const { BN, amountToDecimal } = numbers;

/**
 * As a first iteration, we only allow people to create quests if they hold more that 100 pSEED tokens
 */

export async function isAllowedToCreateQuest(playerAddress: string): Promise<boolean> {
  const pSEEDContractAddress = '0x34a01c0a95b0592cc818cd846c3cf285d6c85a31';
  const pSEEDContract = getERC20Contract(pSEEDContractAddress);
  const pSEEDBalance = await pSEEDContract.balanceOf(playerAddress);
  const pSEEDDecimals = await pSEEDContract.decimals();
  const minimumPooledSeedBalance = new BN(100);
  const pSEEDBalanceInDecimal = amountToDecimal(pSEEDBalance, pSEEDDecimals);

  const allowed = new BN(pSEEDBalanceInDecimal).gt(minimumPooledSeedBalance);

  return allowed;
}
