import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Guild, Player, Player_Role } from 'lib/autogen/hasura-sdk';

import { cacheIDXProfile } from './cacheIDXProfile.js';
import { playerRankUpdated } from './playerRankUpdated.js';
import { playerRoleChanged } from './playerRoleChanged.js';
import { syncDiscordGuildMembers } from './syncDiscordGuildMembers.js';
import { TriggerPayload } from './types.js';

const TRIGGERS = {
  cacheIDXProfile,
  playerRankUpdated,
  playerRoleChanged,
  syncDiscordGuildMembers,
};

type Payload = TriggerPayload<Player> &
  TriggerPayload<Guild> &
  TriggerPayload<Player_Role>;

export const triggerHandler = async (
  req: Request<ParamsDictionary, never, Payload>,
  res: Response,
): Promise<void> => {
  const role = req.body.event?.session_variables?.['x-hasura-role'];
  if (role !== 'admin') {
    throw new Error('Unauthorized');
  }

  const { limiter } = req.app.locals;
  const trigger = TRIGGERS[req.body.trigger.name as keyof typeof TRIGGERS];

  if (trigger) {
    await trigger(req.body, limiter);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
