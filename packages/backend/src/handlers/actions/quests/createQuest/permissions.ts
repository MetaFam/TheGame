import { Constants, numbers } from '@metafam/utils';

import { getERC20Contract, polygonProvider } from '../../../../lib/ethereum';

const { BN, amountToDecimal } = numbers;

/**
 * As a first iteration, we only allow people to create quests if they hold more that 100 pSEED tokens
 */

export async function isAllowedToCreateQuest(
  playerAddress: string,
): Promise<boolean> {
  const pSEEDContract = getERC20Contract(
    Constants.PSEED_ADDRESS,
    polygonProvider,
  );
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
