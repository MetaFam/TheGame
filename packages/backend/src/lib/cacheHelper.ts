import { Maybe } from '@metafam/utils';
import Bottleneck from 'bottleneck';

import updateCachedProfile from '../handlers/actions/idxCache/updateSingle';

let count = 0;

type BottleneckOptions = {
  priority?: number;
  weight?: number;
  expiration?: Maybe<number>;
};

export const queueRecache = async ({
  playerId,
  limiter,
  opts = {},
}: {
  playerId: string;
  limiter: Bottleneck;
  opts?: BottleneckOptions;
}) => {
  if (!playerId) {
    throw new Error('No playerId specified to update.');
  }

  const status = limiter.jobStatus(playerId);
  if (status) {
    console.warn(
      `Job for "${playerId}" already exists with status "${status}".`,
    );
  } else {
    const preRun = count++;

    const result = await limiter.schedule({ id: playerId, ...opts }, () =>
      updateCachedProfile(playerId),
    );
    console.debug({
      msg: 'Completed Profile Update',
      count: preRun,
      playerId,
      ...result,
    });
  }

  return !status;
};

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const MAX_TRIES = 5;

export const cacheProfile = async ({
  playerId,
  limiter,
  opts = {},
}: {
  playerId: string;
  limiter: Bottleneck;
  opts?: BottleneckOptions;
}) => {
  if (!playerId) {
    throw new Error('No playerId specified to update.');
  }

  let status = limiter.jobStatus(playerId);
  if (status) {
    console.debug(`Waiting for job "${playerId}" to complete`);
    let numTries = 1;
    while (status !== Bottleneck.Status.DONE && numTries <= MAX_TRIES) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000);
      status = limiter.jobStatus(playerId);
      numTries += 1;
    }
  } else {
    await queueRecache({ playerId, limiter, opts });
  }
};
