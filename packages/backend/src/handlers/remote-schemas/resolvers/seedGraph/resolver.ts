import { seedGraphClient } from '../../../../lib/seedGraphClient.js';

export const getTokenBalances = async (
  _: unknown,
  { address }: { address: string },
) => {
  if (!address) return null;
  const res = await seedGraphClient.GetTokenBalances({
    address: address.toLowerCase(),
  });
  return (await res.account?.balances) ?? null;
};

export const getTopPSeedHolders = async (
  _: unknown,
  { limit }: { limit: number },
) => {
  const res = await seedGraphClient.GetTopPSeedHolders({
    limit: limit || 50,
  });

  return res.tokenBalances;
};
