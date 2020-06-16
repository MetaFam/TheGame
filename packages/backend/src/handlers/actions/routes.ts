import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';

import updateBoxProfileHandler from './updateBoxProfile/handler';

const router = express.Router();

router.post('/updateBoxProfile', asyncHandlerWrapper(updateBoxProfileHandler));

export default router;
