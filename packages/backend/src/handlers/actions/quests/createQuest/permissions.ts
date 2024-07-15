import { Constants, numbers } from '@metafam/utils';
import { createPublicClient, http } from 'viem';
import { polygon } from 'viem/chains';

import { getERC20Contract } from '#lib/ethereum.js';

const { amountToDecimal } = numbers;

/**
 * As a first iteration, we only allow people to
 * create quests if they hold more that 100 pSEED tokens
 */

export async function isAllowedToCreateQuest(
  playerAddress: `0x${string}`,
) {
  const polygonClient = createPublicClient({
    chain: polygon,
    transport: http(),
  });
  const pSEEDContract = getERC20Contract(
    Constants.PSEED_ADDRESS,
    polygonClient,
  );
  const pSEEDBalance = await pSEEDContract.read.balanceOf([playerAddress]);
  const pSEEDDecimals = await pSEEDContract.read.decimals();
  const minimumPooledSeedBalance = BigInt(Constants.PSEED_FOR_QUEST);
  const pSEEDBalanceInDecimal = amountToDecimal(
    pSEEDBalance as string,
    pSEEDDecimals as number,
  );

  const allowed = BigInt(pSEEDBalanceInDecimal) >= minimumPooledSeedBalance;

  return allowed;
}
