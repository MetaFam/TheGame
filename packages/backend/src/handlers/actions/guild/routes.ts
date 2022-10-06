import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers';
import { handleOAuthCallback } from './discord/oauthHandler';
import { saveGuildHandler } from './saveGuildHandler';
import { saveGuildLayoutHandler } from './saveGuildLayoutHandler';

export const guildRoutes = express.Router();

guildRoutes.post('/discord/auth', asyncHandlerWrapper(handleOAuthCallback));
guildRoutes.post('/save', asyncHandlerWrapper(saveGuildHandler));
guildRoutes.post('/saveLayout', asyncHandlerWrapper(saveGuildLayoutHandler));
