import express from 'express';

import { asyncHandlerWrapper } from '#lib/apiHelpers';
import linkProfileNode from '#handlers/actions/composeDB/linkProfileNode/handler';
import updateSingleProfileHandler from '#handlers/actions/composeDB/updateSingleProfile/handler';

export const routes = express.Router();

routes.post('/linkProfileNode', asyncHandlerWrapper(linkProfileNode));
routes.post(
  '/updateCachedProfile',
  asyncHandlerWrapper(updateSingleProfileHandler),
);
