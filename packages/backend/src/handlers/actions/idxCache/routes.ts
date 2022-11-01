import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers.js';
import updateExpiredProfilesHandler from './updateExpiredProfiles/handler.js';
import updateSingleProfileHandler from './updateSingleProfile/handler.js';

export const cacheRoutes = express.Router();

cacheRoutes.post(
  '/updateSingle',
  asyncHandlerWrapper(updateSingleProfileHandler),
);

cacheRoutes.post(
  '/checkExpired',
  asyncHandlerWrapper(updateExpiredProfilesHandler),
);
