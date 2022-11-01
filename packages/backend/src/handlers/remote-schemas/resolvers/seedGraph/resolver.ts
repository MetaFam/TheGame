import { seedGraphClient } from '../../../../lib/seedGraphClient.js';
import { QueryResolvers, TokenBalances } from '../../autogen/types.js';

export const getTokenBalances: QueryResolvers['getTokenBalances'] = async (
  _,
  { address },
) => {
  if (!address) return null;
  const res = await seedGraphClient.GetTokenBalances({
    address: address.toLowerCase(),
  });

  return res.userToken as TokenBalances;
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
