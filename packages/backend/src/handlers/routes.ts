import express from 'express';

import { asyncHandlerWrapper } from '../lib/apiHelpers';
import { actionRoutes } from './actions/routes';
import { authHandler } from './auth-webhook/handler';
import { remoteSchemaRoutes } from './remote-schemas/routes';

export const router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', "PUT, GET, POST, DELETE, OPTIONS");
  return next();
})

router.get('/', (_, res) => {
  res.send('ok');
});

router.get('/healthz', (_, res) => {
  res.send('ok');
});

router.get('/auth-webhook', asyncHandlerWrapper(authHandler));

router.use('/actions', actionRoutes);

router.use('/remote-schemas', remoteSchemaRoutes);
