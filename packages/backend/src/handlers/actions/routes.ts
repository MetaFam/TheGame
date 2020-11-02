import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { updateBoxProfileHandler } from './updateBoxProfile/handler';
import { UpdateMap, GetMap } from './metamaps/handler';

export const actionRoutes = express.Router();

actionRoutes.post(
  '/updateBoxProfile',
  asyncHandlerWrapper(updateBoxProfileHandler),
);

actionRoutes.post('/metamaps/data', asyncHandlerWrapper(UpdateMap));
actionRoutes.get('/metamaps/data', asyncHandlerWrapper(GetMap));