import ethers from 'ethers';
import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { queueRecache } from '../../../lib/cacheHelper.js';
import { client } from '../../../lib/hasuraClient.js';

const INVALIDATE_AFTER_DAYS = 4; // number of days after which to recache

// @todo return balance of token of player in guild
const setBalances = async ({
  safeAddress,
  offset = 0,
}: {
  safeAddress: string;
  offset?: number;
}) => {
  const res = await fetch(
    `https://safe-transaction-polygon.safe.global/api/v1/safes/${safeAddress}/all-transactions/?limit=100&offset=${offset}&executed=true&queued=false&trusted=true`,
  );
  const { results } = (await res.json()) as any;
  const airdrops = results.filter((tx: any) =>
    tx.origin?.includes('CSV Airdrop'),
  );
  let address = null;
  console.log({ airdrops });
  await Promise.all(
    airdrops
      .map((airdrop: any) =>
        airdrop.transfers.map(
          async ({
            value,
            to,
            tokenAddress,
          }: {
            value: string;
            to: string;
            tokenAddress: string;
          }) => {
            const amount = Number(ethers.utils.formatEther(value));
            await client.AddBalance({
              amount,
              blockHeight: airdrop.blockNumber,
              playerAddress: to,
              tokenAddress,
            });
            address = tokenAddress;
          },
        ),
      )
      .flat(),
  );

  if (!address) return;
  await client.UpdateLastOffset({
    tokenAddress: address,
    offset: offset + results.length,
  });
};

// @todo only query guilds that have a token ID
export default async (req: Request, res: Response): Promise<void> => {
  const { limiter } = req.app.locals;
  const expiration = new Date();
  const invalidateAfterDays =
    req.query.invalidate_after_days != null
      ? parseInt(req.query.invalidate_after_days as string, 10)
      : INVALIDATE_AFTER_DAYS;
  expiration.setDate(expiration.getDate() - invalidateAfterDays);
  const { token: tokens } = await client.GetTokens();

  const members = await Promise.all(
    tokens.map(async ({ safeAddress, lastOffset: offset, guildId }) => {
      const balances = await setBalances({ safeAddress, offset });

      const { guild: players } = await client.GetGuildMembers({ id: guildId });
      // players.map(async (player) =>
      //   player.xp += balances[player.ethereumAddress]
      // )
      return {
        players,
        guildId,
      };
    }),
  );
  res.json('nothing');
  // Iterates through list of members in a guild
  /* const balances = await Promise.all(
   
      .flat(),
  );

   */

  /*  const ids = (
    await Promise.all(
      players.map(async ({ playerId }) => {
        const queued = await queueRecache({ playerId, limiter });
        return queued ? playerId : null;
      }),
    )
  ).filter((id) => !!id);

  res.json({ ids }); */
};
