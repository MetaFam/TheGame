import { Request, Response } from 'express';

import { UpdateQuestCompletionOutput } from '../../types';
import { updateCompletion } from './updateCompletion';

export const updateCompletionHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    input: { updateData },
    session_variables: sessionVariables,
  } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    if (role !== 'player') {
      throw new Error('Expected player role');
    }

    const result = await updateCompletion(playerId, updateData);
    res.json(result);
  } catch (error) {
    const errorResponse: UpdateQuestCompletionOutput = {
      success: false,
      error: error.message,
    };
    res.json(errorResponse);
  }
};
