import { seedGraphClient } from '../../../../lib/seedGraphClient';
import { QueryResolvers, TokenBalances } from '../../autogen/types';

export const getTokenBalances: QueryResolvers['getTokenBalances'] = async (
  _,
  { address },
) => {
  if (!address) return null;
  await seedGraphClient.GetTokenBalances({
    address: address.toLowerCase(),
  });
  return {
    id: address,
    pSeedBalance: '445000000000000000000',
    seedBalance: '0',
  };
  // return res.userToken as TokenBalances;
};

export const getTopPSeedHolders: QueryResolvers['getTopPSeedHolders'] = async (
  _,
  { limit },
) => {
  const holdersResult = await seedGraphClient.GetTopPSeedHolders({
    limit: limit || 50,
  });

  return holdersResult.userTokens as Array<TokenBalances>;
};
