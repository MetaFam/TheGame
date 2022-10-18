import { Request, Response } from 'express';
import { Mutation_RootCreateQuestArgs } from 'lib/autogen/hasura-sdk.js';

import { createQuest } from './createQuest.js';

export const createQuestHandler = async (
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

    const createQuestArgs: Mutation_RootCreateQuestArgs = input;
    const result = await createQuest(playerId, createQuestArgs.quest);
    res.json(result);
  } catch (error) {
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
};
