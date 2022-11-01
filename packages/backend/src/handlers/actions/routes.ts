import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers.js';
import { syncAllGuildDiscordMembers } from '../triggers/syncDiscordGuildMembers.js';
import { guildRoutes } from './guild/routes.js';
import { cacheRoutes } from './idxCache/routes.js';
import { migrateSourceCredAccounts } from './migrateSourceCredAccounts/handler.js';
import { questsRoutes } from './quests/routes.js';

export const actionRoutes = express.Router();

actionRoutes.use('/idxCache', cacheRoutes);

actionRoutes.post(
  '/migrateSourceCredAccounts',
  asyncHandlerWrapper(migrateSourceCredAccounts),
);
actionRoutes.post(
  '/syncAllGuildDiscordMembers',
  asyncHandlerWrapper(syncAllGuildDiscordMembers),
);

actionRoutes.use('/quests', questsRoutes);

actionRoutes.use('/guild', guildRoutes);
