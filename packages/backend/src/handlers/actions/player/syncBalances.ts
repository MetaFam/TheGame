import ethers from 'ethers';
import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { client } from '../../../lib/hasuraClient.js';

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
  const uniqueDrops: Record<string, Record<string, number>>  = {}
  const airdrops = results.filter((tx: any) =>
    tx.origin?.includes('CSV Airdrop'),
  );

  airdrops.forEach(({blockNumber, transfers}: any) => {
    transfers?.forEach(({to, tokenAddress, value}: any) => {
      uniqueDrops[blockNumber] ??= {}
      uniqueDrops[blockNumber][to] ??= 0
      if (tokenAddress == guildTokenAddress) {
        uniqueDrops[blockNumber][to] += Number(ethers.utils.formatEther(value));
      }
    })
  })

  await Promise.all(
    Object.entries(uniqueDrops)
    .map(([blockHeight, drops]) =>
      Object.entries(drops).map(
        async ([to, value]) => {
          await client.AddBalance({
            amount: value,
            blockHeight: Number(blockHeight),
            playerAddress: to,
            tokenAddress: guildTokenAddress,
          });
        },
      ),
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
  await Promise.all(
    tokens.map(async ({ safeAddress, lastOffset: offset, guildId, address }) => {
      await setBalances({ safeAddress, offset, tokenAddress: address });
      const { guild: [{ guild_players: players }] } = await client.GetGuildMembers({ id: guildId });
      await Promise.all(players.map( async (player) => {
        const total = await client.GetTotalForPlayer({ tokenAddress: address, playerAddress: player.Player.ethereumAddress })
        const balance = total.balance_aggregate.aggregate?.sum?.amount
        if (balance != null) {
          await client.UpsertXP({ balance: total.balance_aggregate.aggregate?.sum?.amount, playerId: player.Player.id, tokenAddress: address })
        }
      }))
    }),
  );
  res.json('complete!')
};
