import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { migrateSourceCredAccounts } from './migrateSourceCredAccounts/handler';
import { questsRoutes } from './quests/routes';
import { updateBoxProfileHandler } from './updateBoxProfile/handler';

export const actionRoutes = express.Router();

actionRoutes.post(
  '/updateBoxProfile',
  asyncHandlerWrapper(updateBoxProfileHandler),
);

actionRoutes.post(
  '/migrateSourceCredAccounts',
  asyncHandlerWrapper(migrateSourceCredAccounts),
);

actionRoutes.use('/quests', questsRoutes);
