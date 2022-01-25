import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { syncAllGuildDiscordMembers } from '../triggers/syncDiscordGuildMembers';
import { guildRoutes } from './guild/routes';
import { cacheRoutes } from './idxCache/routes';
import { migrateSourceCredAccounts } from './migrateSourceCredAccounts/handler';
import { questsRoutes } from './quests/routes';

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
