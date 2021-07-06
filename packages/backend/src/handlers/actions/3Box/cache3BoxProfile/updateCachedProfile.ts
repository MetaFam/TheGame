import CeramicClient from '@ceramicnetwork/http-client';
import { getLegacy3BoxProfileAsBasicProfile, IDX } from '@ceramicstudio/idx';
// https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-19/CIP-19.md#record-schema
import type { BasicProfile } from '@ceramicstudio/idx-constants';
import Box from '3box';

import { CONFIG } from '../../../../config';
import {
  AccountType_Enum,
  UpdateBoxProfileResponse,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';
import {
  optimizeImage,
  OptimizeImageParams,
} from '../../../../lib/imageHelpers';

function getImage(image: string | null | undefined, opts: OptimizeImageParams) {
  const [, imageHash] = image?.match(/^ipfs:\/\/(.+)$/) ?? [];

  if (imageHash) {
    return optimizeImage(`${CONFIG.ipfsEndpoint}/ipfs/${imageHash}`, opts);
  }
  return image;
}

const ceramic = new CeramicClient(CONFIG.ceramicDaemonURL);
const idx = new IDX({ ceramic });

export async function updateCachedProfile(
  playerId: string,
): Promise<UpdateBoxProfileResponse> {
  const updatedProfiles: string[] = [];
  const { player_by_pk: player } = await client.GetPlayer({ playerId });

  const ethAddress = player?.ethereum_address;

  if (!ethAddress) {
    throw new Error('unknown-player');
  }

  let idxProfile;
  try {
    idxProfile = await idx.get<BasicProfile>(
      'basicProfile',
      `${ethAddress.toLowerCase()}@eip155:1`,
    );
  } catch (err) {
    if (!err.message.includes('No DID')) {
      throw err;
    }
  }

  if (!idxProfile) {
    idxProfile = await getLegacy3BoxProfileAsBasicProfile(ethAddress);
  }

  if (!idxProfile) {
    console.info(`No Profile For: ${ethAddress}`);
  } else {
    const {
      name,
      description,
      emoji,
      gender,
      url,
      homeLocation,
      residenceCountry: country,
    } = idxProfile;
    let location = homeLocation;
    if (country && country.length > 0) {
      if (location && location.length > 0) {
        location += `, ${country}`;
      } else {
        location = country;
      }
    }
    const values = {
      player_id: playerId,
      name,
      description,
      emoji,
      imageUrl: getImage(idxProfile.image?.original?.src, {
        ar: '1:1',
        height: 200,
      }),
      backgroundImageUrl: getImage(idxProfile.background?.original?.src, {
        height: 300,
      }),
      gender,
      location,
      website: url,
    };

    await client.UpsertProfileCache({ objects: [values] });
  }

  // There isn't yet an interface for linking accounts on self.id
  const boxProfile = await Box.getProfile(ethAddress);
  const verifiedAccounts = await Box.getVerifiedAccounts(boxProfile);

  if (verifiedAccounts.github) {
    const { insert_player_account: insert } = await client.UpsertAccount({
      objects: [
        {
          player_id: playerId,
          type: AccountType_Enum.Github,
          identifier: verifiedAccounts.github.username,
        },
      ],
    });
    if (insert?.affected_rows) {
      updatedProfiles.push('github');
    } else if (insert?.affected_rows === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `Unable to insert Github user ${verifiedAccounts.github.username} for playerId ${playerId}`,
      );
    }
  }

  if (verifiedAccounts.twitter) {
    const { insert_player_account: insert } = await client.UpsertAccount({
      objects: [
        {
          player_id: playerId,
          type: AccountType_Enum.Twitter,
          identifier: verifiedAccounts.twitter.username,
        },
      ],
    });
    if (insert?.affected_rows) {
      updatedProfiles.push('twitter');
    } else if (insert?.affected_rows === undefined) {
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
