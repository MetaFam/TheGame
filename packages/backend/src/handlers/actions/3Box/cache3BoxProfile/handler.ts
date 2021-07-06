import { Request, Response } from 'express';

import { updateCachedProfile } from './updateCachedProfile';

export const cache3BoxProfileHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const session = req.body.session_variables;
  const role = session['x-hasura-role'];
  const playerId = session['x-hasura-user-id'];

  if (role !== 'player') {
    throw new Error('expected role player');
  }

  const result = await updateCachedProfile(playerId);

  res.json(result);
};
