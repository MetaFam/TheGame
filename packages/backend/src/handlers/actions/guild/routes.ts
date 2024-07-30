import express from 'express';

import { asyncHandlerWrapper } from '#lib/apiHelpers';

import { handleOAuthCallback } from '#handlers/actions/guild/discord/oauthHandler';
import { saveGuildHandler } from '#handlers/actions/guild/saveGuildHandler';
import { saveGuildLayoutHandler } from '#handlers/actions/guild/saveGuildLayoutHandler';

export const guildRoutes = express.Router();

guildRoutes.post('/discord/auth', asyncHandlerWrapper(handleOAuthCallback));
guildRoutes.post('/save', asyncHandlerWrapper(saveGuildHandler));
guildRoutes.post('/saveLayout', asyncHandlerWrapper(saveGuildLayoutHandler));
