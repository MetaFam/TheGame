import express from 'express';

import { asyncHandlerWrapper } from '../../../lib/apiHelpers.js';
import linkProfileNode from './linkProfileNode.js';

export const ceramicRoutes = express.Router();

ceramicRoutes.post('/linkProfileNode', asyncHandlerWrapper(linkProfileNode));
