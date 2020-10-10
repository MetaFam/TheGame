import Box from '3box';

import { client } from '../../../lib/hasuraClient';
import { UpdateBoxProfileResponse } from '../types';

export async function updateVerifiedAccounts(
  playerId: string,
): Promise<UpdateBoxProfileResponse> {
  const updatedProfiles: string[] = [];
  const data = await client.GetPlayer({ playerId });

  const ethAddress = data.Player_by_pk?.ethereum_address;

  if (!ethAddress) {
    throw new Error('unknown-player');
  }

  const boxProfile = await Box.getProfile(ethAddress);
  const verifiedAccounts = await Box.getVerifiedAccounts(boxProfile);

  if (verifiedAccounts.github) {
    const result = await client.UpsertAccount({
      objects: [
        {
          player_id: playerId,
          type: 'GITHUB',
          identifier: verifiedAccounts.github.username,
        },
      ],
    });
    if (result.insert_Account?.affected_rows) {
      updatedProfiles.push('github');
    } else {
      console.warn(
        `Unable to insert Github user ${verifiedAccounts.github.username} for playerId ${playerId}`,
      );
    }
  }

  if (verifiedAccounts.twitter) {
    const result = await client.UpsertAccount({
      objects: [
        {
          player_id: playerId,
          type: 'TWITTER',
          identifier: verifiedAccounts.twitter.username,
        },
      ],
    });
    if (result.insert_Account?.affected_rows) {
      updatedProfiles.push('twitter');
    } else {
      console.warn(
        `Unable to insert Twitter user ${verifiedAccounts.twitter.username} for playerId ${playerId}`,
      );
    }
  }

  return {
    success: true,
    updatedProfiles,
  };
}
