import { Request, Response } from 'express';

import { CreateQuestCompletionOutput, Mutation_RootCreateQuestCompletionArgs } from '../../../../lib/autogen/hasura-sdk';
import { createCompletion } from './createCompletion';

export const createCompletionHandler = async (
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

    const { questCompletion }: Mutation_RootCreateQuestCompletionArgs = input;
    const result = await createCompletion(playerId, questCompletion);
    res.json(result);
  } catch (error) {
    const errorResponse: CreateQuestCompletionOutput = {
      success: false,
      error: error.message,
    };
    res.json(errorResponse);
  }
};
