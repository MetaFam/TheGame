import { Request, Response } from 'express';

import { createQuest } from './createQuest';

export const createQuestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  if (role !== 'player') {
    throw new Error('expected role player');
  }

  const result = await createQuest(playerId, input);

  res.json(result);
};
