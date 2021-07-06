import Box from '3box';

import {
  AccountType_Enum,
  UpdateBoxProfileResponse,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';

export async function updateVerifiedAccounts(
  playerId: string,
): Promise<UpdateBoxProfileResponse> {
  const updatedProfiles: string[] = [];
  const data = await client.GetPlayer({ playerId });

  const ethAddress = data.player_by_pk?.ethereum_address;

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
          type: AccountType_Enum.Github,
          identifier: verifiedAccounts.github.username,
        },
      ],
    });
    if (result.insert_player_account?.affected_rows) {
      updatedProfiles.push('github');
    } else {
      // eslint-disable-next-line no-console
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
          type: AccountType_Enum.Twitter,
          identifier: verifiedAccounts.twitter.username,
        },
      ],
    });
    if (result.insert_player_account?.affected_rows) {
      updatedProfiles.push('twitter');
    } else {
      // eslint-disable-next-line no-console
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
