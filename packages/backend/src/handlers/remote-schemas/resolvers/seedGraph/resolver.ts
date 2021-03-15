import { seedGraphClient } from '../../../../lib/seedGraphClient';
import { QueryResolvers, TokenBalances } from '../../autogen/types';

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
