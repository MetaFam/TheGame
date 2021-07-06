import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers';
import { cache3BoxProfileHandler } from './cache3BoxProfile/handler';
import { refresh3BoxCacheHandler } from './refresh3BoxCache/handler';

export const cacheRoutes = express.Router();

cacheRoutes.post('/update', asyncHandlerWrapper(cache3BoxProfileHandler));

cacheRoutes.post('/updateAll', asyncHandlerWrapper(refresh3BoxCacheHandler));
