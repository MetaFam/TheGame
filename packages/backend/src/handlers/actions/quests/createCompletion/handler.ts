import { Request, Response } from 'express';

import { createCompletion } from './createCompletion.js';

export const createCompletionHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    if (role !== 'player') {
      throw new Error(`Expected player role; got ${role}.`);
    }

    const { questCompletion } = input;
    const result = await createCompletion(playerId, questCompletion);
    res.json(result);
  } catch (error) {
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
};
