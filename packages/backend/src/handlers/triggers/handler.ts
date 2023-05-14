import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Guild, Player, Player_Role } from '../../lib/autogen/hasura-sdk.js';
import { syncDiscordGuildMembers } from '../actions/guild/sync.js';
import { cacheIDXProfile } from './cacheIDXProfile.js';
import { playerRankUpdated } from './playerRankUpdated.js';
import { playerRoleChanged } from './playerRoleChanged.js';
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
  try {
    const role = req.body.event?.session_variables?.['x-hasura-role'];
    if (role !== 'admin') {
      res.status(403).send('Unauthorized');
      return;
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
  } catch (error) {
    console.error({ triggerError: error });
    res.status(500).send((error as Error).message);
  }
};
