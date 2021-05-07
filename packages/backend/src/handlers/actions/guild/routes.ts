import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers';
import { handleOAuthCallback } from './discordOAuth/handler';

export const guildRoutes = express.Router();

guildRoutes.post('/discordAuth', asyncHandlerWrapper(handleOAuthCallback));
