import { Player } from '../../lib/autogen/hasura-sdk';
import updateCachedProfile from '../actions/idxCache/updateSingle';
import { TriggerPayload } from './types';

// This trigger is called when new accounts are created.
// It skips the update queue associated with the normal
// cache invalidation process.
export const cacheIDXProfile = async (payload: TriggerPayload<Player>) => {
  const address = payload.event.data.new?.ethereum_address;

  if (!address) return;

  const playerId = payload.event.data.new?.id;

  await updateCachedProfile(playerId);
};
