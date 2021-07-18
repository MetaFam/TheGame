import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Player } from '../../lib/autogen/hasura-sdk';
import { cacheIDXProfile } from './cacheIDXProfile';
import { TriggerPayload } from './types';
import { updateDiscordRole } from './updateDiscordRole';

const TRIGGERS = {
  cacheIDXProfile,
  player_rank_updated: updateDiscordRole,
};

export const triggerHandler = async (
  req: Request<ParamsDictionary, never, TriggerPayload<Player>>,
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
