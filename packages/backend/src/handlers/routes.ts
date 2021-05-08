import express from 'express';

import { asyncHandlerWrapper } from '../lib/apiHelpers';
import { actionRoutes } from './actions/routes';
import { authHandler } from './auth-webhook/handler';
import { remoteSchemaRoutes } from './remote-schemas/routes';
import { triggerHandler } from './triggers/handler';

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
