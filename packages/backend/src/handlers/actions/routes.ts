import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers.js';
import { routes as composeDBRoutes } from './composeDB/routes.js';
import { guildRoutes } from './guild/routes.js';
import { syncAllGuildDiscordMembers } from './guild/sync.js';
import syncBalances from './player/syncBalances.js';
import { questsRoutes } from './quests/routes.js';
export const actionRoutes = express.Router();

actionRoutes.post('/syncBalances', asyncHandlerWrapper(syncBalances));

actionRoutes.post(
  '/syncAllGuildDiscordMembers',
  asyncHandlerWrapper(syncAllGuildDiscordMembers),
);

actionRoutes.use('/quests', questsRoutes);

actionRoutes.use('/guild', guildRoutes);

actionRoutes.use('/composeDB', composeDBRoutes);
