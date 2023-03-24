import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Guild, Player, Player_Role } from '../../lib/autogen/hasura-sdk.js';
import { syncDiscordGuildMembers } from '../actions/guild/sync.js';
import { cacheComposeDBProfile } from './cacheComposeDBProfile.js';
import { playerRankUpdated } from './playerRankUpdated.js';
import { playerRoleChanged } from './playerRoleChanged.js';
import { TriggerPayload } from './types.js';

const TRIGGERS = {
  cacheComposeDBProfile,
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
  const triggerName = req.body.trigger.name as keyof typeof TRIGGERS;
  const trigger = TRIGGERS[triggerName];

  if (trigger) {
    await trigger(req.body, limiter);
    res.sendStatus(200);
  } else {
    res.status(404).send(`Trigger ${triggerName} not found.`);
  }
};
