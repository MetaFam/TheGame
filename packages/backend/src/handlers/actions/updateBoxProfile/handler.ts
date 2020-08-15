import Box, { VerifiedAccounts } from '3box';
import { Request, Response } from 'express';

import { client } from '../../../lib/hasuraClient';

export const updateBoxProfileHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const session = req.body.session_variables;
  const role = session['x-hasura-role'];
  const playerId = session['x-hasura-user-id'];

  if (role !== 'player') {
    throw new Error('expected role player');
  }

  const data = await client.GetPlayer({ playerId });

  const ethAddress = data.Player_by_pk?.ethereum_address;

  if (!ethAddress) {
    throw new Error('unknown-player');
  }

  const boxProfile = await Box.getProfile(ethAddress);
  const verifiedProfile = await Box.getVerifiedAccounts(boxProfile);
  const result = await updateVerifiedProfiles(playerId, verifiedProfile);

  res.json(result);
};

async function updateVerifiedProfiles(
  playerId: string,
  verifiedProfiles: VerifiedAccounts,
): Promise<UpdateBoxProfileResponse> {
  const updatedProfiles: string[] = [];

  if (verifiedProfiles.github) {
    const result = await client.UpsertAccount({
      objects: [
        {
          player_id: playerId,
          type: 'GITHUB',
          identifier: verifiedProfiles.github.username,
        },
      ],
    });
    if (result.insert_Account?.affected_rows === 0) {
      throw new Error('Error while upserting github profile');
    }
    updatedProfiles.push('github');
  }

  if (verifiedProfiles.twitter) {
    const result = await client.UpsertAccount({
      objects: [
        {
          player_id: playerId,
          type: 'TWITTER',
          identifier: verifiedProfiles.twitter.username,
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
