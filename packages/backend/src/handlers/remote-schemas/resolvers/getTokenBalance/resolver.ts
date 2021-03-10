import { seedGraphClient } from '../../../../lib/seedGraphClient';
import { QueryResolvers } from '../../autogen/types';

export const getTokenBalance: QueryResolvers['getTokenBalance'] = async (
  _,
  { address },
) => {
  if (!address) return null;
  const res = await seedGraphClient.GetTokenBalance({
    address: address.toLowerCase(),
  });

  return res.userToken;
};
