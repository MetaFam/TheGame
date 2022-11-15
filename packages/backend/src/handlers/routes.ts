import express from 'express';

import { asyncHandlerWrapper } from '../lib/apiHelpers.js';
import { actionRoutes } from './actions/routes.js';
import { authHandler } from './auth-webhook/handler.js';
import { remoteSchemaRoutes } from './remote-schemas/routes.js';
import { triggerHandler } from './triggers/handler.js';

export const router = express.Router();

router.get('/', (_, res) => {
  res.send('ok');
});

router.get('/healthz', (_, res) => {
  res.send('ok');
});

router.get('/auth-webhook', asyncHandlerWrapper(authHandler));
router.post('/triggers', asyncHandlerWrapper(triggerHandler));

router.use('/actions', actionRoutes);

router.use('/remote-schemas', remoteSchemaRoutes);
