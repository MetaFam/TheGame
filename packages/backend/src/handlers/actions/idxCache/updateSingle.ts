import CeramicClient from '@ceramicnetwork/http-client';
import { getLegacy3BoxProfileAsBasicProfile, IDX } from '@ceramicstudio/idx';
// https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-19/CIP-19.md#record-schema
import type { BasicProfile } from '@ceramicstudio/idx-constants';
import Box from '3box';

import { CONFIG } from '../../../config';
import {
  AccountType_Enum,
  UpdateBoxProfileResponse,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';
import { optimizeImage, OptimizeImageParams } from '../../../lib/imageHelpers';

function getImage(image: string | null | undefined, opts: OptimizeImageParams) {
  const [, imageHash] = image?.match(/^ipfs:\/\/(.+)$/) ?? [];

  if (imageHash) {
    return optimizeImage(`${CONFIG.ipfsEndpoint}/ipfs/${imageHash}`, opts);
  }
  return image;
}

const ceramic = new CeramicClient(CONFIG.ceramicDaemonURL);
const idx = new IDX({ ceramic });

// eslint-disable-next-line import/no-default-export
export default async (playerId: string): Promise<UpdateBoxProfileResponse> => {
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
    idxProfile = {}; // create an empty placeholder row
  }

  const {
    name,
    description,
    emoji,
    gender,
    url,
    homeLocation: location,
    residenceCountry: country,
    image,
    background,
  } = idxProfile;
  const values = {
    playerId,
    name,
    description,
    emoji,
    imageURL: getImage(image?.original?.src, {
      ar: '1:1',
      height: 200,
    }),
    backgroundImageURL: getImage(background?.original?.src, {
      height: 300,
    }),
    gender,
    location,
    country,
    website: url,
  };

  await client.UpsertProfileCache({ objects: [values] });

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
};
