import Ceramic from '@ceramicnetwork/http-client';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import {
  AlsoKnownAs,
  model as alsoKnownAsModel,
} from '@datamodels/identity-accounts-web';
// https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-19/CIP-19.md#record-schema
import {
  BasicProfile,
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic';
import { ModelManager } from '@glazed/devtools';
// import { DataModel } from '@glazed/datamodel';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
// import type { ModelTypesToAliases } from '@glazed/types';
import { getLegacy3BoxProfileAsBasicProfile } from '@self.id/3box-legacy';
import Box from '3box';

import { CONFIG } from '../../../config';
import {
  AccountType_Enum,
  UpdateBoxProfileResponse,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';

const cache = new Map();
const ceramic = new Ceramic(CONFIG.ceramicURL);
const loader = new TileLoader({ ceramic, cache });
const manager = new ModelManager(ceramic);
manager.addJSONModel(basicProfileModel);
manager.addJSONModel(alsoKnownAsModel);

export default async (playerId: string): Promise<UpdateBoxProfileResponse> => {
  const updatedProfiles: string[] = [];
  const { player_by_pk: player } = await client.GetPlayer({ playerId });
  const ethAddress = player?.ethereum_address;

  const store = new DIDDataStore({
    ceramic,
    loader,
    model: await manager.toPublished(),
  });

  if (!ethAddress) {
    throw new Error('unknown-player');
  }

  let basicProfile;
  let alsoKnownAs;
  try {
    const caip10 = await Caip10Link.fromAccount(
      ceramic,
      `${ethAddress.toLowerCase()}@eip155:1`,
    );

    if (!caip10.did) {
      console.error(`No CAIP-10 Link For ${ethAddress}`);
    } else {
      console.info({ start: '¡here!', cer: CONFIG.ceramicURL });

      basicProfile = (await store.get(
        'basicProfile',
        caip10.did,
      )) as BasicProfile;

      console.info({ basicProfile });

      alsoKnownAs = (await store.get('alsoKnownAs', caip10.did)) as AlsoKnownAs;

      console.info({ alsoKnownAs });
    }
  } catch (err) {
    if (!(err as Error).message.includes('No DID')) {
      throw err;
    }
  }

  if (!basicProfile) {
    basicProfile = await getLegacy3BoxProfileAsBasicProfile(ethAddress);
  }

  console.info({ profile: JSON.stringify(basicProfile ?? null, null, 2) });

  if (!basicProfile) {
    console.info(`No Profile For: ${ethAddress}`);
    basicProfile = {}; // create an empty placeholder row
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
  } = basicProfile;
  const values = {
    playerId,
    name,
    description,
    emoji,
    imageURL: image?.original?.src,
    backgroundImageURL: background?.original?.src,
    gender,
    location,
    country,
    website: url,
  };

  await client.UpsertProfileCache({ objects: [values] });

  // There isn't yet an interface for linking accounts on self.id
  const boxProfile = await Box.getProfile(ethAddress);
  const verifiedAccounts = await Box.getVerifiedAccounts(boxProfile);

  Promise.all(
    ['GITHUB', 'TWITTER'].map(async (serviceName) => {
      const service = serviceName as AccountType_Enum;
      const key = service.toLowerCase() as 'github' | 'twitter';
      if (verifiedAccounts[key]) {
        const { username } = verifiedAccounts[key] as { username: string };
        const { insert_player_account: insert } = await client.UpsertAccount({
          objects: [
            {
              player_id: playerId,
              type: service,
              identifier: username,
            },
          ],
        });
        if ((insert?.affected_rows ?? 0) > 0) {
          updatedProfiles.push(key);
        } else if (insert?.affected_rows === undefined) {
          // eslint-disable-next-line no-console
          console.warn(
            `Unable to insert ${service} user ${username} for playerId ${playerId}.`,
          );
        }
      }
    }),
  );

  return {
    success: true,
    updatedProfiles,
  };
};
