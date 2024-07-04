import { Maybe } from '@metafam/utils';

import { seedGraphClient } from '../../../../lib/seedGraphClient.js';

export type Balances = {
  id: string;
  SEED: number;
  pSEED: number;
};

const e18ToFloat = (e18: string | bigint) =>
  // 4 decimal points
  Number(BigInt(e18) / BigInt(1e14)) / 1e4;

export const getTokenBalances = async (
  _: unknown,
  { address }: { address: string },
) => {
  if (!address) return null;
  const { account } = await seedGraphClient.GetTokenBalances({
    address: address.toLowerCase(),
  });
  if (!account) return null;
  return Object.fromEntries(
    account.balances
      .map((balance) => [
        balance.token.symbol.replace(/seed/i, 'SEED'),
        e18ToFloat(balance.amount),
      ])
      .concat([['id', account.id]]),
  ) as Balances;
};

export const getTopPSeedHolders = async (
  _: unknown,
  { limit }: { limit: number },
) => {
  const { tokenBalances } = await seedGraphClient.GetTopPSeedHolders({
    limit: limit || 50,
  });

  return tokenBalances.map(({ amount, account: { id } }) => ({
    id,
    balance: e18ToFloat(amount),
  }));
};
