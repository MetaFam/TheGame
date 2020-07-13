import express from 'express';

import { asyncHandlerWrapper } from '../lib/apiHelpers';

import actionsRoutes from './actions/routes';

import authHandler from './auth-webhook/handler';

const router = express.Router();

router.get('/', function (_, res) {
  res.send('pong');
});

router.get('/auth-webhook', asyncHandlerWrapper(authHandler));
router.use('/actions', actionsRoutes);

export default router;
