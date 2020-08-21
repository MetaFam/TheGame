import Box from '3box';

import { client } from '../../../lib/hasuraClient';

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
    if (result.insert_Account?.affected_rows === 0) {
      throw new Error('Error while upserting github profile');
    }
    updatedProfiles.push('github');
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
    if (result.insert_Account?.affected_rows === 0) {
      throw new Error('Error while upserting github profile');
    }
    updatedProfiles.push('twitter');
  }

  return {
    success: true,
    updatedProfiles,
  };
}
