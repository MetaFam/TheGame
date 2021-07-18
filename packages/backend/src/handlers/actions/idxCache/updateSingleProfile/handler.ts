import { Request, Response } from 'express';

import updateCachedProfile from '../updateSingle';

// eslint-disable-next-line import/no-default-export
export default async (req: Request, res: Response): Promise<void> => {
  const session = req.body.session_variables;
  const role = session['x-hasura-role'];
  const playerId = req.body.input?.playerId;

  if (!['admin', 'player'].includes(role)) {
    throw new Error(`Expected Role: admin or player. Got "${role}".`);
  }

  if (!playerId) {
    throw new Error('No playerId specified to update.');
  }

  if (!req.app.locals.queuedRecacheFor[playerId]) {
    req.app.locals.queuedRecacheFor[playerId] = true;
    req.app.locals.limiter.schedule(() =>
      (async () => {
        try {
          await updateCachedProfile(playerId);
        } finally {
          req.app.locals.queuedRecacheFor[playerId] = false;
        }
      })(),
    );
    res.json({ success: true });
  } else {
    throw new Error('Already queued to be refreshed.');
  }
};
