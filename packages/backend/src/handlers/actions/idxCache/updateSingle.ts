import Ceramic from '@ceramicnetwork/http-client';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import {
  Account,
  AlsoKnownAs,
  model as alsoKnownAsModel,
} from '@datamodels/identity-accounts-web';
import {
  BasicProfile,
  ImageSources,
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic';
import { ModelManager } from '@glazed/devtools';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
import {
  BasicProfileImages,
  BasicProfileStrings,
  ExtendedProfile,
  ExtendedProfileImages,
  extendedProfileModel,
  ExtendedProfileObjects,
  ExtendedProfileStrings,
  HasuraProfileProps,
  Values,
} from '@metafam/utils';
import { getLegacy3BoxProfileAsBasicProfile } from '@self.id/3box-legacy';
import { CONFIG } from '../../../config';
import {
  AccountType_Enum,
  Maybe,
  UpdateBoxProfileResponse,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';

export default async (playerId: string): Promise<UpdateBoxProfileResponse> => {
  const updatedProfiles: string[] = [];
  const { player_by_pk: player } = await client.GetPlayer({ playerId });
  const ethAddress = player?.ethereumAddress;

  if (!ethAddress) {
    throw new Error(`Unknown Player: "${playerId}"`);
  }

  try {
    const cache = new Map();
    const ceramic = new Ceramic(CONFIG.ceramicURL);
    const loader = new TileLoader({ ceramic, cache });
    const manager = new ModelManager(ceramic);
    manager.addJSONModel(basicProfileModel);
    manager.addJSONModel(alsoKnownAsModel);
    manager.addJSONModel(extendedProfileModel);

    const store = new DIDDataStore({
      ceramic,
      loader,
      model: await manager.toPublished(),
    });
    const caip10 = await Caip10Link.fromAccount(
      ceramic,
      // Defaulting to mainnet. This may cause data irregularities
      // if their wallet is connected to a different DID on a
      // different chain.
      `${ethAddress.toLowerCase()}@eip155:1`,
    );
    const values: HasuraProfileProps = { playerId };
    let basicProfile: Maybe<BasicProfile> = null;

    if (!caip10.did) {
      console.debug(`No CAIP-10 Link For ${ethAddress}`);
    } else {
      basicProfile = await store.get('basicProfile', caip10.did);
    }

    // This isn't called if they haven't created a mainnet DID
    // This should be checked even without a DID
    if (!basicProfile) {
      basicProfile = await getLegacy3BoxProfileAsBasicProfile(ethAddress);
    }

    if (!basicProfile) {
      console.debug(`No Basic Profile For: ${ethAddress} (${caip10.did})`);
    } else {
      Object.entries(BasicProfileStrings).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof BasicProfileStrings>;
        const toKey = hasuraId as keyof typeof BasicProfileStrings;
        if (basicProfile?.[fromKey] != null) {
          values[toKey] = (basicProfile[fromKey] as string) ?? null;
        }
      });
      Object.entries(BasicProfileImages).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof BasicProfileImages>;
        const toKey = hasuraId as keyof typeof BasicProfileImages;
        if (basicProfile?.[fromKey] != null) {
          values[toKey] = (basicProfile[fromKey] as ImageSources).original.src;
        }
      });
    }

    if (caip10.did) {
      const extendedProfile: Maybe<ExtendedProfile> = await store.get(
        'extendedProfile',
        caip10.did,
      );

      if (!extendedProfile) {
        console.debug(`No Extended Profile For: ${ethAddress} (${caip10.did})`);
      } else {
        Object.entries(ExtendedProfileStrings).forEach(
          ([hasuraId, ceramicId]) => {
            const fromKey = ceramicId as Values<typeof ExtendedProfileStrings>;
            const toKey = hasuraId as keyof typeof ExtendedProfileStrings;
            if (extendedProfile?.[fromKey] != null) {
              values[toKey] = (extendedProfile[fromKey] as string) ?? null;
            }
          },
        );
        Object.entries(ExtendedProfileImages).forEach(
          ([hasuraId, ceramicId]) => {
            const fromKey = ceramicId as Values<typeof ExtendedProfileImages>;
            const toKey = hasuraId as keyof typeof ExtendedProfileImages;
            if (extendedProfile?.[fromKey] != null) {
              values[toKey] = (extendedProfile[
                fromKey
              ] as ImageSources).original.src;
            }
          },
        );
        Object.entries(ExtendedProfileObjects).forEach(
          ([hasuraId, ceramicId]) => {
            const fromKey = ceramicId as Values<typeof ExtendedProfileObjects>;
            const toKey = hasuraId as keyof typeof ExtendedProfileObjects;
            if (extendedProfile?.[fromKey] != null) {
              switch (toKey) {
                case 'availableHours': {
                  values[toKey] = extendedProfile[fromKey] as number;
                  break;
                }
                case 'timeZone': {
                  // values[toKey] = extendedProfile[fromKey] as TimeZone;
                  break;
                }
                default: {
                  console.info({ fromKey, toKey });
                }
              }
            }
          },
        );
      }
    }

    try {
      const response = await client.UpsertProfileCache({ objects: [values] });

      console.info({
        s: CONFIG.ceramicURL,
        addr: ethAddress,
        did: caip10.did,

        basicProfile,
        values,
      });

      console.info({ response });
    } catch (err) {
      if (
        !(err as Error).message.includes(
          'violates unique constraint "profile_username_key"',
        )
      ) {
        throw err;
      } else {
        values.username = `${values.username}-${(
          caip10.did ?? ethAddress
        ).slice(-8)}`;
        const response = await client.UpsertProfileCache({
          objects: [values],
        });

        console.info({
          s: CONFIG.ceramicURL,
          addr: ethAddress,
          did: caip10.did,

          basicProfile,
          values,
        });

        console.info({ response });
      }
    }

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
            console.error(`No hostname for AlsoKnownAs: "${host}"`);
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
    if (!(err as Error).message.includes('No DID')) {
      throw new Error(`Update Error: ${(err as Error).message}`);
    }
  }

  return {
    success: true,
    updatedProfiles,
  };
};
