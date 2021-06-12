import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers';
import { handleOAuthCallback } from './discord/oauthHandler';

export const guildRoutes = express.Router();

guildRoutes.post('/discord/auth', asyncHandlerWrapper(handleOAuthCallback)); 
