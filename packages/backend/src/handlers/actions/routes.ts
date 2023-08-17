import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers.js';
import { routes as composeDBRoutes } from './composeDB/routes.js';
import { guildRoutes } from './guild/routes.js';
import { syncAllGuildDiscordMembers } from './guild/sync.js';
import { questsRoutes } from './quests/routes.js';
import { syncSourceCredAccounts } from './sourcecred/sync.js';

export const actionRoutes = express.Router();

actionRoutes.use('/composeDB', composeDBRoutes);
actionRoutes.use('/guild', guildRoutes);

actionRoutes.post(
  '/syncSourceCredAccounts',
  asyncHandlerWrapper(syncSourceCredAccounts),
);
actionRoutes.post(
  '/syncAllGuildDiscordMembers',
  asyncHandlerWrapper(syncAllGuildDiscordMembers),
);

actionRoutes.use('/quests', questsRoutes);
