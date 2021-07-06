import { Player } from '../../lib/autogen/hasura-sdk';
import { updateCachedProfile } from '../actions/3Box/cache3BoxProfile/updateCachedProfile';
import { TriggerPayload } from './types';

export const cache3BoxProfile = async (payload: TriggerPayload<Player>) => {
  const address = payload.event.data.new?.ethereum_address;

  if (!address) return;

  const playerId = payload.event.data.new?.id;

  await updateCachedProfile(playerId);
};
