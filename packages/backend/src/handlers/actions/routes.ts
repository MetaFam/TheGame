import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers.js';
import { ceramicRoutes } from './ceramic/routes.js';
import { guildRoutes } from './guild/routes.js';
import { syncAllGuildDiscordMembers } from './guild/sync.js';
import { cacheRoutes } from './idxCache/routes.js';
import { questsRoutes } from './quests/routes.js';
import { syncSourceCredAccounts } from './sourcecred/sync.js';

export const actionRoutes = express.Router();

actionRoutes.use('/ceramic', ceramicRoutes);
actionRoutes.use('/guild', guildRoutes);
actionRoutes.use('/idxCache', cacheRoutes);

actionRoutes.post(
  '/syncSourceCredAccounts',
  asyncHandlerWrapper(syncSourceCredAccounts),
);
actionRoutes.post(
  '/syncAllGuildDiscordMembers',
  asyncHandlerWrapper(syncAllGuildDiscordMembers),
);

actionRoutes.use('/quests', questsRoutes);
