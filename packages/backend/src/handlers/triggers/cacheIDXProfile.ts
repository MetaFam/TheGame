import Bottleneck from 'bottleneck';
import { Player } from 'lib/autogen/hasura-sdk';
import { queueRecache } from 'lib/cacheHelper';

import { TriggerPayload } from './types.js';

// This trigger is called when new accounts are created.
export const cacheIDXProfile = async (
  payload: TriggerPayload<Player>,
  limiter: Bottleneck,
) => {
  const { id: playerId } = payload.event.data.new ?? {};

  if (playerId) {
    await queueRecache({ playerId, limiter });
  }
};
