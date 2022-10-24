import express from 'express';
import { asyncHandlerWrapper } from 'lib/apiHelpers';

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
