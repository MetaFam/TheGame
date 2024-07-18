import express from 'express';

import { asyncHandlerWrapper } from '#lib/apiHelpers';

import linkProfileNode from './linkProfileNode/handler.js';
import updateSingleProfileHandler from './updateSingleProfile/handler.js';

export const routes = express.Router();

routes.post('/linkProfileNode', asyncHandlerWrapper(linkProfileNode));
routes.post(
  '/updateCachedProfile',
  asyncHandlerWrapper(updateSingleProfileHandler),
);
