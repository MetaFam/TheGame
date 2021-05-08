import { Request, Response } from 'express';

import { updateVerifiedAccounts } from './updateVerifiedAccounts';

export const updateBoxProfileHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const session = req.body.session_variables;
  const role = session['x-hasura-role'];
  const playerId = session['x-hasura-user-id'];

  if (role !== 'player') {
    throw new Error('expected role player');
  }

  const result = await updateVerifiedAccounts(playerId);

  res.json(result);
};
