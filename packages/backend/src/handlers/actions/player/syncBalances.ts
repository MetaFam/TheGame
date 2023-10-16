import { getCurrentSeasonStart } from '@metafam/utils';
import ethers from 'ethers';
import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { client } from '../../../lib/hasuraClient.js';
import { computeRank } from '../../../lib/rankHelpers.js';

type SafeResponse = {
  results: Array<{
    origin: string;
    executionDate: string;
    transfers: Array<{
      to: string;
      tokenAddress: string;
      value: string;
    }>;
  }>;
};

// @todo return balance of token of player in guild
const setBalances = async ({
  safeAddress,
  offset = 0,
  tokenAddress: guildTokenAddress,
  chainId = 1,
}: {
  safeAddress: string;
  offset?: number;
  tokenAddress: string;
  chainId: number;
}) => {
  const safes = {
    137:
      'https://safe-transaction-polygon.safe.global' +
      `/api/v1/safes/${safeAddress}/all-transactions/` +
      `?limit=100&offset=${offset}&executed=true` +
      '&queued=false&trusted=true',
  };
  const safeURL = safes[chainId as keyof typeof safes];
  if (!safeURL) {
    throw new Error(`No Safe URL for chain #${chainId}.`);
  }

  const res = await fetch(safeURL);
  const { results } = (await res.json()) as SafeResponse;
  const uniqueDrops: Record<string, Record<string, number>> = {};
  const airdrops = results.filter((tx) => tx.origin?.includes('CSV Airdrop'));

  airdrops.forEach(({ executionDate, transfers }) => {
    transfers?.forEach(({ to, tokenAddress, value }) => {
      uniqueDrops[executionDate] ??= {};
      uniqueDrops[executionDate][to] ??= 0;
      if (tokenAddress === guildTokenAddress) {
        uniqueDrops[executionDate][to] += Number(
          ethers.utils.formatEther(value),
        );
      }
    });
  });

  const added = await Promise.all(
    Object.entries(uniqueDrops).map(async ([executedAt, drops]) => {
      const dropsRet = await Promise.all(
        Object.entries(drops).map(async ([to, value]) => {
          const dat = {
            playerAddress: to,
            amount: value,
          };
          await client.AddBalance({
            ...dat,
            executedAt: new Date(executedAt),
            tokenAddress: guildTokenAddress,
          });
          return dat;
        }),
      );
      return {
        executedAt: new Date(executedAt).toLocaleString('sv'),
        drops: dropsRet,
      };
    }),
  );

  await client.UpdateLastOffset({
    tokenAddress: guildTokenAddress,
    offset: offset + results.length,
  });

  return {
    added,
    oldOffset: offset,
    newOffset: offset + results.length,
  };
};

// @todo only query guilds that have a token ID
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { token: tokens } = await client.GetTokens();
    const seasonStart = getCurrentSeasonStart();
    const tokenPromiseRet = await Promise.allSettled(
      tokens.map(
        async ({
          safeAddress,
          lastOffset: offset,
          guildId,
          address,
          chainId,
          multiplier,
        }) => {
          const balRet = await setBalances({
            safeAddress,
            offset,
            tokenAddress: address,
            chainId,
          });
          const {
            guild: [{ guild_players: players }],
          } = await client.GetGuildMembers({ id: guildId });
          const playerRet = await Promise.all(
            players.map(
              async ({
                Player: { ethereumAddress: ethAddress, id: playerId },
              }) => {
                const total = await client.GetTotalForPlayer({
                  tokenAddress: address,
                  playerAddress: ethAddress,
                });
                const balance =
                  total.balance_aggregate.aggregate?.sum?.amount ?? 0;

                const seasonalTotal = await client.GetTotalForPlayer({
                  tokenAddress: address,
                  playerAddress: ethAddress,
                  executedAfter: seasonStart,
                });
                const seasonalBalance =
                  seasonalTotal.balance_aggregate.aggregate?.sum?.amount ?? 0;

                const {
                  xp: [{ initial } = { initial: 0 }],
                } = await client.GetInitialXP({ playerId });
                const calculated = balance * multiplier + initial;

                await client.UpsertXP({
                  balance: calculated,
                  playerId,
                  tokenAddress: address,
                  seasonalBalance,
                });

                return {
                  address: ethAddress,
                  xp: {
                    initial,
                    accumulated: balance,
                    calculated,
                    seasonal: seasonalBalance,
                  },
                };
              },
            ),
          );
          return {
            ...balRet,
            multiplier,
            count: players.length,
            players: playerRet,
          };
        },
      ),
    );
    const tokenRet = tokenPromiseRet.map((t) =>
      t.status === 'fulfilled' ? t.value : { status: 'failed' },
    );

    const { xp } = await client.GetPlayersByTotalXP();
    Promise.allSettled(
      xp.map(async ({ playerId, seasonalBalance, balance }, index) => {
        const rank = computeRank(index);
        await client.UpdateProfileXP({
          playerId,
          seasonXP: seasonalBalance,
          totalXP: balance,
          rank,
        });
      }),
    );
    res.json({
      success: true,
      message: `Successfully synced ${xp.length} users.`,
      seasonStart,
      tokenReturns: tokenRet,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};
