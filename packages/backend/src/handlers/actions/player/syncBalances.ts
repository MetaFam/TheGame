import { getCurrentSeasonStart, type Maybe } from '@metafam/utils';
import { ethers } from 'ethers';
import { Request, Response } from 'express';

import { client } from '../../../lib/hasuraClient.js';
import { computeRank } from '../../../lib/rankHelpers.js';

type SafeResponse = {
  next: Maybe<string>;
  results: Array<{
    origin: string;
    blockNumber: number;
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
  lastBlockHeight = 0,
  tokenAddress: guildTokenAddress,
  chainId = 1,
}: {
  safeAddress: string;
  lastBlockHeight?: number;
  tokenAddress: string;
  chainId: number;
}) => {
  let safeURL;
  let minBlockHeight;
  let maxBlockHeight;
  const uniqueDrops: Record<string, Record<string, number>> = {};
  do {
    const safes = {
      137:
        'https://safe-transaction-polygon.safe.global' +
        `/api/v1/safes/${safeAddress}/all-transactions/` +
        `?limit=10&executed=true` +
        '&queued=false&trusted=true',
    };
    safeURL ??= safes[chainId as keyof typeof safes];
    if (!safeURL) {
      throw new Error(`No Safe URL for chain #${chainId}.`);
    }

    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(safeURL);
    // eslint-disable-next-line no-await-in-loop
    const { next, results } = (await res.json()) as SafeResponse;
    safeURL = next;
    const heights = results.map(({ blockNumber }) => blockNumber);
    minBlockHeight = Math.min(minBlockHeight ?? Infinity, ...heights);
    maxBlockHeight = Math.max(maxBlockHeight ?? 0, ...heights);
    const airdrops = results.filter((tx) => tx.origin?.includes('CSV Airdrop'));

    airdrops.forEach(({ blockNumber, executionDate, transfers }) => {
      if (blockNumber <= lastBlockHeight) return;

      transfers?.forEach(({ to, tokenAddress, value }) => {
        uniqueDrops[executionDate] ??= {};
        uniqueDrops[executionDate][to] ??= 0;
        if (tokenAddress === guildTokenAddress) {
          uniqueDrops[executionDate][to] += Number(ethers.formatEther(value));
        }
      });
    });
  } while (!!safeURL && minBlockHeight > lastBlockHeight);

  const added = await Promise.all(
    Object.entries(uniqueDrops).map(async ([executedAt, drops]) => {
      const dropsReturned = await Promise.all(
        Object.entries(drops).map(async ([to, value]) => {
          const entry = {
            playerAddress: to,
            amount: value,
          };
          await client.AddBalance({
            ...entry,
            executedAt: new Date(executedAt),
            tokenAddress: guildTokenAddress,
          });
          return entry;
        }),
      );
      return {
        executedAt: new Date(executedAt).toLocaleString('sv').replace(' ', '@'),
        drops: dropsReturned,
      };
    }),
  );

  await client.UpdateLastBlockHeight({
    tokenAddress: guildTokenAddress,
    height: maxBlockHeight,
  });

  return {
    added,
    oldHeight: lastBlockHeight,
    newHeight: maxBlockHeight,
  };
};

// @todo only query guilds that have a token ID
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { token: tokens } = await client.GetTokens();
    const seasonStart = getCurrentSeasonStart();
    const tokenPromiseReturn = await Promise.allSettled(
      tokens.map(
        async ({
          safeAddress,
          lastBlockHeight,
          guildId,
          address,
          chainId,
          multiplier,
        }) => {
          const balancesReturned = await setBalances({
            safeAddress,
            lastBlockHeight,
            tokenAddress: address,
            chainId,
          });
          const {
            guild: [{ guild_players: players }],
          } = await client.GetGuildMembers({ id: guildId });
          const playerReturned = await Promise.all(
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
                const seasonalSum =
                  seasonalTotal.balance_aggregate.aggregate?.sum?.amount ?? 0;
                const seasonalBalance = seasonalSum * multiplier;

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
            ...balancesReturned,
            multiplier,
            count: players.length,
            players: playerReturned,
          };
        },
      ),
    );
    const tokenReturns = tokenPromiseReturn.map((t) =>
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
      tokenReturns,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};
