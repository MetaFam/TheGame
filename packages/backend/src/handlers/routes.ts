import express from 'express';

import { asyncHandlerWrapper } from '../lib/apiHelpers';

import authHandler from './auth-webhook/handler';

const router = express.Router();

router.get('/', function (req, res) {
  res.send('pong')
});

router.get('/auth-webhook', asyncHandlerWrapper(authHandler));

export default router;
