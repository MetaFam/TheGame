import express from 'express';

import { asyncHandlerWrapper } from '../lib/apiHelpers';
import { actionRoutes } from './actions/routes';
import { authHandler } from './auth-webhook/handler';

export const router = express.Router();

router.get('/', function (_, res) {
  res.send('pong');
});

router.get('/auth-webhook', asyncHandlerWrapper(authHandler));
router.use('/actions', actionRoutes);
