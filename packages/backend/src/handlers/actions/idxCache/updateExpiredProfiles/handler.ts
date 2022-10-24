import { Request, Response } from 'express';
import { queueRecache } from 'lib/cacheHelper';
import { client } from 'lib/hasuraClient';

const INVALIDATE_AFTER_DAYS = 4; // number of days after which to recache

export default async (req: Request, res: Response): Promise<void> => {
  const { limiter } = req.app.locals;
  const expiration = new Date();
  const invalidateAfterDays =
    req.query.invalidate_after_days != null
      ? parseInt(req.query.invalidate_after_days as string, 10)
      : INVALIDATE_AFTER_DAYS;
  expiration.setDate(expiration.getDate() - invalidateAfterDays);
  const { profile: players } = await client.GetCacheEntries({
    updatedBefore: expiration,
  });
  const ids = (
    await Promise.all(
      players.map(async ({ playerId }) => {
        const queued = await queueRecache({ playerId, limiter });
        return queued ? playerId : null;
      }),
    )
  ).filter((id) => !!id);

  res.json({ ids });
};
