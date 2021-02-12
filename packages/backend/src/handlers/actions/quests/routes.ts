import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers';
import { createCompletionHandler } from './createCompletion/handler';
import { createQuestHandler } from './createQuest/handler';

export const questsRoutes = express.Router();

questsRoutes.post('/createQuest', asyncHandlerWrapper(createQuestHandler));
questsRoutes.post('/createCompletion', asyncHandlerWrapper(createCompletionHandler));
