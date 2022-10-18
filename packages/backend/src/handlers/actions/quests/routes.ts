import express from 'express';
import { asyncHandlerWrapper } from 'lib/apiHelpers.js';

import { createCompletionHandler } from './createCompletion/handler.js';
import { createQuestHandler } from './createQuest/handler.js';
import { updateCompletionHandler } from './updateCompletion/handler.js';

export const questsRoutes = express.Router();

questsRoutes.post('/createQuest', asyncHandlerWrapper(createQuestHandler));
questsRoutes.post(
  '/createCompletion',
  asyncHandlerWrapper(createCompletionHandler),
);
questsRoutes.post(
  '/updateCompletion',
  asyncHandlerWrapper(updateCompletionHandler),
);
