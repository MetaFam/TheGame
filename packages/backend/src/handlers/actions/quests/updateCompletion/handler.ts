import { Request, Response } from 'express';

import { Mutation_RootUpdateQuestCompletionArgs as QuestCompletionArgs } from '#lib/autogen/hasura-sdk.js';

import { updateCompletion } from './updateCompletion.js';

export const updateCompletionHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    if (role !== 'player') {
      throw new Error('Expected player role');
    }

    const updateCompletionArgs: QuestCompletionArgs = input;
    const result = await updateCompletion(
      playerId,
      updateCompletionArgs.updateData,
    );
    res.json(result);
  } catch (error) {
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
};
