import { Constants } from '@metafam/utils';

import { GetPoolTokenDataQuery } from '#lib/autogen/balancer-sdk';
import { balancerPolygonGraphClient } from '#lib/balancerPolygonClient';

export type PSeedInfo = {
  priceUsd: number
}

export const getPSeedInfo = async () => {
  const poolData = await balancerPolygonGraphClient.GetPoolTokenData({
    address: Constants.PSEED_ADDRESS,
  });
  const pseedPrice = computePSeedPrice(poolData);

  return {
    priceUsd: pseedPrice,
  } as PSeedInfo;
};

const computePSeedPrice = (poolData: GetPoolTokenDataQuery): number | null => {
  if (poolData?.pools?.length === 1) {
    const poolTotalValueUSD = poolData.pools[0].tokens?.reduce(
      (sum, poolToken) =>
        sum +
        parseFloat(poolToken.token.latestUSDPrice) *
          parseFloat(poolToken.balance),
      0,
    );
    if (poolTotalValueUSD != null) {
      return poolTotalValueUSD / parseFloat(poolData.pools[0].totalShares);
    }
  }
  return null;
};
