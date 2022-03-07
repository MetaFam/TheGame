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
