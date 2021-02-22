import { Request, Response } from 'express';

import { Mutation_RootUpdateQuestCompletionArgs,UpdateQuestCompletionOutput } from '../../../../lib/autogen/hasura-sdk';
import { updateCompletion } from './updateCompletion';

export const updateCompletionHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    input,
    session_variables: sessionVariables,
  } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    if (role !== 'player') {
      throw new Error('Expected player role');
    }

    const updateCompletionArgs: Mutation_RootUpdateQuestCompletionArgs = input;
    const result = await updateCompletion(playerId, updateCompletionArgs.updateData);
    res.json(result);
  } catch (error) {
    const errorResponse: UpdateQuestCompletionOutput = {
      success: false,
      error: error.message,
    };
    res.json(errorResponse);
  }
};
