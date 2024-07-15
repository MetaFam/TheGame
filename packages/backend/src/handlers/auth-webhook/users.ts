import Bottleneck from 'bottleneck';

import { client } from '#lib/hasuraClient.js';

import { cacheProfile } from '../actions/composeDB/cacheHelper.js';

async function createPlayer(ethAddress: string, limiter: Bottleneck) {
  const { insert_profile: insert } = await client.CreatePlayerFromETH({
    ethereumAddress: ethAddress,
  });
  if (insert?.affected_rows !== 2) {
    throw new Error(
      `Affected ${insert?.affected_rows} row${
        insert?.affected_rows !== 1 ? 's' : ''
      } inserting ${ethAddress}.`,
    );
  }
  const playerId = insert?.returning[0].player.id;
  cacheProfile({ playerId, limiter, opts: { priority: 1 } });

  return { id: playerId };
}

const status: Record<string, string> = {};

/* When a profile page loads, this method can get called repeatedly
 * quickly enough that multiple processes enter createAccount, and
 * all but the fastest will fail the uniqueness check on ETH address.
 */
export async function getOrCreatePlayerId(
  ethereumAddress: string,
  limiter: Bottleneck,
) {
  const ethAddress = ethereumAddress.toLowerCase();
  let created = false;
  const {
    player: [existing],
  } = await client.GetPlayerFromETH({
    ethereumAddress: ethAddress,
  });
  let { id } = existing ?? {};

  const maxLoops = 10;
  let loops = 0;

  while (!id && ++loops <= maxLoops) {
    if (status[ethAddress] != null) {
      let count = 0;
      // ToDo: rather than a wait loop, this could be accomplished by awaiting a promise.
      while (['creating'].includes(status[ethAddress]) && ++count <= maxLoops) {
        // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-loop-func
        await new Promise((resolve) => {
          const wait = Math.random() * 100 * count;
          console.debug(`Waiting ${wait}ms on ${ethAddress} account creation.`);
          setTimeout(resolve, wait);
        });
      }
    }
    if ([undefined, 'failed'].includes(status[ethAddress])) {
      try {
        status[ethAddress] = 'creating';
        console.debug(`Account Creation: ${ethAddress}`);
        // eslint-disable-next-line no-await-in-loop
        ({ id } = await createPlayer(ethAddress, limiter));
        created = true;
        status[ethAddress] = 'created';
      } catch (err) {
        console.error(
          `Account Creation Failed: ${ethAddress} (${(err as Error).message})`,
        );
        status[ethAddress] = 'failed';
      }
    }

    if (!id) {
      const {
        player: [newPlayer],
        // eslint-disable-next-line no-await-in-loop
      } = await client.GetPlayerFromETH({
        ethereumAddress: ethAddress,
      });
      ({ id } = newPlayer ?? {});
    }
  }

  return { id, created };
}
