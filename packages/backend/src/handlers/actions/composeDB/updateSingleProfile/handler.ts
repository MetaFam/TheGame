import { Request, Response } from 'express';

import { queueRecache } from '../cacheHelper.js';

export default async (req: Request, res: Response): Promise<void> => {
  const role = req.body.session_variables['x-hasura-role'];
  const { playerId } = req.body.input ?? {};
  const { limiter } = req.app.locals;

  if (!['admin', 'player', 'public'].includes(role)) {
    throw new Error(`Expected Role: admin, player, or public. Got "${role}".`);
  }

  if (!playerId) {
    throw new Error('Player Id not specified in updateSingleProfile handler.');
  }

  if (!limiter) {
    throw new Error('Couldn’t find Bottleneck limiter.');
  }

  const queued = await queueRecache({ playerId, limiter });

  res.json({ success: true, queued });
};
