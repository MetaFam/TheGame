import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers';
import updateExpiredProfilesHandler from './updateExpiredProfiles/handler';
import updateSingleProfileHandler from './updateSingleProfile/handler';

export const cacheRoutes = express.Router();

cacheRoutes.post(
  '/updateSingle',
  asyncHandlerWrapper(updateSingleProfileHandler),
);

cacheRoutes.post(
  '/checkExpired',
  asyncHandlerWrapper(updateExpiredProfilesHandler),
);
