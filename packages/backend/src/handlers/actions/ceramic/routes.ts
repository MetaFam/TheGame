import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers.js';
import linkProfileNode from './linkProfileNode.js';

export const cacheRoutes = express.Router();

cacheRoutes.post('/linkProfileNode', asyncHandlerWrapper(linkProfileNode));
