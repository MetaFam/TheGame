import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers';
import { createQuestHandler } from './createQuest/handler';

export const questsRoutes = express.Router();

questsRoutes.post('/create', asyncHandlerWrapper(createQuestHandler));
