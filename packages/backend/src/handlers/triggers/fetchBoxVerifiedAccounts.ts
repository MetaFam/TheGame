import { Player } from '../../lib/autogen/hasura-sdk';
import { updateVerifiedAccounts } from '../actions/updateBoxProfile/updateVerifiedAccounts';
import { TriggerPayload } from './types';

export const fetchBoxVerifiedAccounts = async (
  payload: TriggerPayload<Player>,
) => {
  const address = payload.event.data.new?.ethereum_address;

  if (!address) {
    return;
  }

  const playerId = payload.event.data.new?.id;

  await updateVerifiedAccounts(playerId);
};
