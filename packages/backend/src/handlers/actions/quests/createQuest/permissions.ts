import { numbers } from '@metafam/utils';

import { CONFIG } from '../../../../config';
import { getERC20Contract } from '../../../../lib/ethereum';

const { BN, amountToDecimal } = numbers;

/**
 * As a first iteration, we only allow people to create quests if they hold more that 100 pSEED tokens
 */

export async function isAllowedToCreateQuest(
  playerAddress: string,
): Promise<boolean> {
  const pSEEDContractAddress = CONFIG.pSEEDAddress;
  const pSEEDContract = getERC20Contract(pSEEDContractAddress);
  const pSEEDBalance = await pSEEDContract.balanceOf(playerAddress);
  const pSEEDDecimals = await pSEEDContract.decimals();
  const minimumPooledSeedBalance = new BN(100);
  const pSEEDBalanceInDecimal = amountToDecimal(
    pSEEDBalance.toString(),
    pSEEDDecimals,
  );

  const allowed = new BN(pSEEDBalanceInDecimal).gt(minimumPooledSeedBalance);

  return allowed;
}
