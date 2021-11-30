import Ceramic from '@ceramicnetwork/http-client';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import {
  Account,
  AlsoKnownAs,
  model as alsoKnownAsModel,
} from '@datamodels/identity-accounts-web';
// https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-19/CIP-19.md#record-schema
import {
  BasicProfile,
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic';
import { ModelManager } from '@glazed/devtools';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
import { getLegacy3BoxProfileAsBasicProfile } from '@self.id/3box-legacy';

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
  const ethAddress = player?.ethereumAddress;

  const store = new DIDDataStore({
    ceramic,
    loader,
    model: await manager.toPublished(),
  });

  if (!ethAddress) {
    throw new Error(`Unknown Player: ${JSON.stringify(player, null, 2)}`);
  }

  const caip10 = await Caip10Link.fromAccount(
    ceramic,
    `${ethAddress.toLowerCase()}@eip155:1`,
  );

  try {
    let basicProfile;

    if (!caip10.did) {
      console.debug(`No CAIP-10 Link For ${ethAddress}`);
    } else {
      basicProfile = (await store.get(
        'basicProfile',
        caip10.did,
      )) as BasicProfile;
    }

    if (!basicProfile) {
      basicProfile = await getLegacy3BoxProfileAsBasicProfile(ethAddress);
    }

    if (!basicProfile) {
      console.debug(`No Profile For: ${ethAddress}`);
    } else {
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
    }
  } catch (err) {
    if (!(err as Error).message.includes('No DID')) {
      throw err;
    }
  }

  try {
    if (caip10.did) {
      const alsoKnownAs = ((await store.get('alsoKnownAs', caip10.did)) ??
        {}) as AlsoKnownAs;
      const { accounts = [] } = alsoKnownAs;

      await Promise.all(
        accounts?.map(async ({ host, id: username }: Account) => {
          const service = host
            ?.replace(/\.com$/, '')
            .toUpperCase() as AccountType_Enum;
          if (!service) {
            console.error(
              `No hostname for AlsoKnownAs: ${JSON.stringify(
                alsoKnownAs,
                null,
                2,
              )}`,
            );
          } else {
            // If the account has been registered previously, this will
            // destructively assign it to the current user removing any
            // other users.
            //
            // ToDo: Examine the JWT to validate that it came from a
            // trusted source. Specifically, either the IdentityLink
            // service backing //self.id or one established by MetaGame
            const {
              insert_player_account: insert,
            } = await client.UpsertAccount({
              objects: [
                {
                  playerId,
                  type: service,
                  identifier: username,
                },
              ],
            });
            if (insert?.affected_rows === undefined) {
              // eslint-disable-next-line no-console
              console.warn(
                `Unable to insert ${service} user ${username} for playerId ${playerId}.`,
              );
            } else if (insert.affected_rows > 0) {
              updatedProfiles.push(service);
            }
          }
        }),
      );
    }
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
  }

  return {
    success: true,
    updatedProfiles,
  };
};
