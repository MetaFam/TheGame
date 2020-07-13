import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { updateBoxProfileHandler } from './updateBoxProfile/handler';

export const actionRoutes = express.Router();

actionRoutes.post(
  '/updateBoxProfile',
  asyncHandlerWrapper(updateBoxProfileHandler),
);
