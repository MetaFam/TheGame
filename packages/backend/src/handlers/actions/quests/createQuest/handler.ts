import { Request, Response } from 'express';

import { CreateQuestOutput, Mutation_RootCreateQuestArgs } from '../../../../lib/autogen/hasura-sdk';
import { createQuest } from './createQuest';

export const createQuestHandler = async (
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

    const createQuestArgs: Mutation_RootCreateQuestArgs = input;
    const result = await createQuest(playerId, createQuestArgs.quest);
    res.json(result);
  } catch (error) {
    const errorResponse: CreateQuestOutput = {
      success: false,
      error: error.message,
    };
    res.json(errorResponse);
  }
};
