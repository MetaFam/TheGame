import express from 'express';

import { asyncHandlerWrapper } from '../lib/apiHelpers';
import { actionRoutes } from './actions/routes';
import { remoteSchemaRoutes } from './remote-schemas/routes';
import { authHandler } from './auth-webhook/handler';

export const router = express.Router();

router.get('/', function(_, res) {
  res.send('ok');
});

router.get('/healthz', function(_, res) {
  res.send('ok');
});

router.get('/auth-webhook', asyncHandlerWrapper(authHandler));

router.use('/actions', actionRoutes);

router.use('/remote-schemas', remoteSchemaRoutes);
