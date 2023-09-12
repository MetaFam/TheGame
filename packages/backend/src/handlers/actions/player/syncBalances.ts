import { getCurrentSeasonStart } from '@metafam/utils';
import ethers from 'ethers';
import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { client } from '../../../lib/hasuraClient.js';
import { computeRank } from '../../../lib/rankHelpers.js';

const INVALIDATE_AFTER_DAYS = 4; // number of days after which to recache

// @todo return balance of token of player in guild
const setBalances = async ({
  safeAddress,
  offset = 0,
  tokenAddress: guildTokenAddress,
}: {
  safeAddress: string;
  offset?: number;
  tokenAddress: string;
}) => {
  const res = await fetch(
    `https://safe-transaction-polygon.safe.global/api/v1/safes/${safeAddress}/all-transactions/?limit=100&offset=${offset}&executed=true&queued=false&trusted=true`,
  );

  const { results } = (await res.json()) as any;
  const uniqueDrops: Record<string, Record<string, number>> = {};
  const airdrops = results.filter((tx: any) =>
    tx.origin?.includes('CSV Airdrop'),
  );

  airdrops.forEach(({ executionDate, transfers }: any) => {
    transfers?.forEach(({ to, tokenAddress, value }: any) => {
      uniqueDrops[executionDate] ??= {};
      uniqueDrops[executionDate][to] ??= 0;
      if (tokenAddress === guildTokenAddress) {
        uniqueDrops[executionDate][to] += Number(
          ethers.utils.formatEther(value),
        );
      }
    });
  });

  await Promise.all(
    Object.entries(uniqueDrops)
      .map(([executionDate, drops]) =>
        Object.entries(drops).map(async ([to, value]) => {
          await client.AddBalance({
            amount: value,
            executedAt: new Date(executionDate),
            playerAddress: to,
            tokenAddress: guildTokenAddress,
          });
        }),
      )
      .flat(),
  );

  await client.UpdateLastOffset({
    tokenAddress: guildTokenAddress,
    offset: offset + results.length,
  });
};

// @todo only query guilds that have a token ID
export default async (req: Request, res: Response): Promise<void> => {
  const expiration = new Date();
  const invalidateAfterDays =
    req.query.invalidate_after_days != null
      ? parseInt(req.query.invalidate_after_days as string, 10)
      : INVALIDATE_AFTER_DAYS;
  expiration.setDate(expiration.getDate() - invalidateAfterDays);
  const { token: tokens } = await client.GetTokens();
  await Promise.allSettled(
    tokens.map(
      async ({ safeAddress, lastOffset: offset, guildId, address }) => {
        await setBalances({ safeAddress, offset, tokenAddress: address });
        const {
          guild: [{ guild_players: players }],
        } = await client.GetGuildMembers({ id: guildId });
        await Promise.all(
          players.map(async (player) => {
            const total = await client.GetTotalForPlayer({
              tokenAddress: address,
              playerAddress: player.Player.ethereumAddress,
            });
            const balance = total.balance_aggregate.aggregate?.sum?.amount;

            const seasonalTotal = await client.GetTotalForPlayer({
              tokenAddress: address,
              playerAddress: player.Player.ethereumAddress,
              executedAfter: getCurrentSeasonStart(),
            });
            const seasonalBalance =
              seasonalTotal.balance_aggregate.aggregate?.sum?.amount;

            const {
              xp: [{ initial } = { initial: 0 }],
            } = await client.GetInitialXP({ playerId: player.Player.id });

            await client.UpsertXP({
              balance: (balance ?? 0) + initial,
              playerId: player.Player.id,
              tokenAddress: address,
              seasonalBalance,
            });
          }),
        );
      },
    ),
  );
  const ranks = await client.GetPlayersByTotalXP();
  console.log(ranks);
  Promise.allSettled(
    ranks.xp.map(async ({ playerId, seasonalBalance, balance }, index) => {
      const rank = computeRank(index);
      await client.UpdateProfileXP({
        playerId,
        seasonXP: seasonalBalance,
        totalXP: balance,
        rank,
      });
    }),
  );
  res.json('complete! XP saved');
};
