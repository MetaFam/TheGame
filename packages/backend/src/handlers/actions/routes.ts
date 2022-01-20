import express from 'express';
import multer from 'multer';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { syncAllGuildDiscordMembers } from '../triggers/syncDiscordGuildMembers';
import { guildRoutes } from './guild/routes';
import { cacheRoutes } from './idxCache/routes';
import { migrateSourceCredAccounts } from './migrateSourceCredAccounts/handler';
import { questsRoutes } from './quests/routes';
import web3StorageUpload from './storage/handler';

const upload = multer({ dest: 'uploads/profile/' });

export const actionRoutes = express.Router();

actionRoutes.use('/idxCache', cacheRoutes);

actionRoutes.post(
  '/migrateSourceCredAccounts',
  asyncHandlerWrapper(migrateSourceCredAccounts),
);
actionRoutes.post(
  '/syncAllGuildDiscordMembers',
  asyncHandlerWrapper(syncAllGuildDiscordMembers),
);

actionRoutes.use('/quests', questsRoutes);

actionRoutes.use('/guild', guildRoutes);

const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'background', maxCount: 1 },
]);
actionRoutes.post('/storage', cpUpload, web3StorageUpload);
