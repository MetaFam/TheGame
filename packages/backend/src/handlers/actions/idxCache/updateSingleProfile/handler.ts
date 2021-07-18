import { Request, Response } from 'express';

import updateCachedProfile from '../updateSingle';

// eslint-disable-next-line import/no-default-export
export default async (req: Request, res: Response): Promise<void> => {
  const session = req.body.session_variables;
  const role = session['x-hasura-role'];
  const playerId = req.body.input?.playerId;

  if (!['admin', 'player'].includes(role)) {
    res.json({
      success: false,
      error: `Expected Role: admin or player. Got "${role}".`,
    });
    return;
  }

  if (!playerId) {
    res.json({
      success: false,
      error: 'No playerId specified to update.',
    });
    return;
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
    res.json({ success: false, error: 'Already queued to be refreshed.' });
  }
};
