import { Request, Response } from 'express';

import { client } from '../../../../lib/hasuraClient';
import updateCachedProfile from '../updateSingle';

const INVALIDATE_AFTER_DAYS = 4; // number of days after which to recache

// eslint-disable-next-line import/no-default-export
export default async (req: Request, res: Response): Promise<void> => {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() - INVALIDATE_AFTER_DAYS);
  const { profile_cache: players } = await client.GetCacheEntries({
    updatedBefore: expiration,
  });
  const idsToProcess: string[] = [];
  await Promise.all(
    players.map(async ({ playerId }) => {
      if (!req.app.locals.queuedRecacheFor[playerId]) {
        req.app.locals.queuedRecacheFor[playerId] = true;
        idsToProcess.push(playerId);
        req.app.locals.limiter.schedule(() =>
          (async () => {
            try {
              await updateCachedProfile(playerId);
            } finally {
              req.app.locals.queuedRecacheFor[playerId] = false;
            }
          })(),
        );
      }
    }),
  );
  res.json({ ids: idsToProcess });
};
