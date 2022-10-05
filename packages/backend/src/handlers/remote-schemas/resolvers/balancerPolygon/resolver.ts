import { Constants } from '@metafam/utils';
import {
  PSeedInfo,
  QueryResolvers,
} from 'handlers/remote-schemas/autogen/types';
import { GetPoolTokenDataQuery } from 'lib/autogen/balancerpolygon-sdk';
import { balancerPolygonGraphClient } from 'lib/balancerPolygonClient';

export const getPSeedInfo: QueryResolvers['getPSeedInfo'] = async () => {
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
