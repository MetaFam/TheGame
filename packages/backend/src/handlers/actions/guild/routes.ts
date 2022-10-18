import express from 'express';
import { asyncHandlerWrapper } from 'lib/apiHelpers.js';

import { handleOAuthCallback } from './discord/oauthHandler.js';
import { saveGuildHandler } from './saveGuildHandler.js';
import { saveGuildLayoutHandler } from './saveGuildLayoutHandler.js';

export const guildRoutes = express.Router();

guildRoutes.post('/discord/auth', asyncHandlerWrapper(handleOAuthCallback));
guildRoutes.post('/save', asyncHandlerWrapper(saveGuildHandler));
guildRoutes.post('/saveLayout', asyncHandlerWrapper(saveGuildLayoutHandler));
