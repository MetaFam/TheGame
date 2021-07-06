import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { cacheRoutes } from './3Box/routes';
import { guildRoutes } from './guild/routes';
import { migrateSourceCredAccounts } from './migrateSourceCredAccounts/handler';
import { questsRoutes } from './quests/routes';

export const actionRoutes = express.Router();

actionRoutes.use('/cache', cacheRoutes);

actionRoutes.post(
  '/migrateSourceCredAccounts',
  asyncHandlerWrapper(migrateSourceCredAccounts),
);

actionRoutes.use('/quests', questsRoutes);

actionRoutes.use('/guild', guildRoutes);
