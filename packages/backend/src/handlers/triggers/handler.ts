import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Guild, Player } from '../../lib/autogen/hasura-sdk';
import { cacheIDXProfile } from './cacheIDXProfile';
import { syncDiscordGuildMembers } from './syncDiscordGuildMembers';
import { TriggerPayload } from './types';
import { updateDiscordRole } from './updateDiscordRole';

const TRIGGERS = {
  cacheIDXProfile,
  player_rank_updated: updateDiscordRole,
  syncDiscordGuildMembers,
};

type Payload = TriggerPayload<Player> & TriggerPayload<Guild>;

export const triggerHandler = async (
  req: Request<ParamsDictionary, never, Payload>,
  res: Response,
): Promise<void> => {
  const role = req.body.event?.session_variables?.['x-hasura-role'];

  if (role !== 'admin') {
    throw new Error('Unauthorized');
  }

  const trigger = TRIGGERS[req.body.trigger.name as keyof typeof TRIGGERS];

  if (trigger) {
    await trigger(req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
