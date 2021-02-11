import { Request, Response } from 'express';

import { CreateQuestOutput } from '../types';
import { createQuest } from './createQuest';

export const createQuestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    input: { quest },
    session_variables: sessionVariables,
  } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    if (role !== 'player') {
      throw new Error('Expected player role');
    }
    const result = await createQuest(playerId, quest);
    res.json(result);
  } catch (error) {
    const errorResponse: CreateQuestOutput = {
      success: false,
      error: error.message,
    };
    res.json(errorResponse);
  }
};
