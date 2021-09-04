import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { guildRoutes } from './guild/routes';
import { cacheRoutes } from './idxCache/routes';
import { migrateSourceCredAccounts } from './migrateSourceCredAccounts/handler';
import { questsRoutes } from './quests/routes';
import web3StorageUpload from './storage/handler';
import multer from 'multer';

const upload = multer({ dest: 'uploads/profile/' });

export const actionRoutes = express.Router();

actionRoutes.use('/idxCache', cacheRoutes);

actionRoutes.post(
  '/migrateSourceCredAccounts',
  asyncHandlerWrapper(migrateSourceCredAccounts),
);

actionRoutes.use('/quests', questsRoutes);

actionRoutes.use('/guild', guildRoutes);

actionRoutes.post(
  '/storage',
  upload.single('image'),
  web3StorageUpload,
);
