import { CeramicClient } from '@ceramicnetwork/http-client';
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
  Profile_Update_Column,
  UpdateIdxProfileResponse,
} from '../../../lib/autogen/hasura-sdk';
import { maskFor } from '../../../lib/colorHelpers';
import { client } from '../../../lib/hasuraClient';

export default async (playerId: string): Promise<UpdateIdxProfileResponse> => {
  const accountLinks: string[] = [];
  const fields: string[] = [];
  const { player_by_pk: player } = await client.GetPlayer({ playerId });
  const { ethereumAddress } = player ?? {};
  let did = null;

  if (!ethereumAddress) {
    throw new Error(`Unknown Player: "${playerId}"`);
  } else {
    console.debug(`Updating Profile Cache For ${ethereumAddress}`);
  }

  try {
    const cache = new Map();
    const ceramic = new CeramicClient(CONFIG.ceramicURL);
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
    ({ did } = await Caip10Link.fromAccount(
      ceramic,
      // Defaulting to mainnet. This may cause data irregularities
      // if their wallet is connected to a different DID on a
      // different chain.
      `${ethereumAddress.toLowerCase()}@eip155:1`,
    ));
    const values: HasuraProfileProps = {};
    let basicProfile: Maybe<BasicProfile> = null;
    let extendedProfile: Maybe<ExtendedProfile> = null;

    if (!did) {
      console.debug(`No CAIP-10 Link For ${ethereumAddress}`);
    } else {
      basicProfile = await store.get('basicProfile', did);
    }

    if (!basicProfile) {
      basicProfile = await getLegacy3BoxProfileAsBasicProfile(ethereumAddress);
    }

    if (!basicProfile) {
      console.debug(`No Basic Profile For: ${ethereumAddress} (${did})`);
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

    if (did) {
      extendedProfile = await store.get('extendedProfile', did);

      if (!extendedProfile) {
        console.debug(`No Extended Profile For: ${ethereumAddress} (${did})`);
      } else {
        Object.entries(ExtendedProfileStrings).forEach(
          async ([hasuraId, ceramicId]) => {
            const fromKey = ceramicId as Values<typeof ExtendedProfileStrings>;
            const toKey = hasuraId as keyof typeof ExtendedProfileStrings;
            if (extendedProfile?.[fromKey] != null) {
              if (fromKey !== 'meetWithWalletDomain') {
                values[toKey] = (extendedProfile[fromKey] as string) ?? null;
              } else if (extendedProfile[fromKey] === 'mww_remove') {
                await client.RemovePlayerAccount({
                  playerId,
                  accountType: AccountType_Enum.Meetwithwallet,
                });
              } else {
                await client.UpsertAccount({
                  objects: [
                    {
                      playerId,
                      type: AccountType_Enum.Meetwithwallet,
                      identifier: extendedProfile[fromKey] as string,
                    },
                  ],
                });
              }
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
              switch (fromKey) {
                case 'availableHours': {
                  values.availableHours = extendedProfile.availableHours;
                  break;
                }
                case 'magicDisposition': {
                  values.colorMask =
                    maskFor(extendedProfile.magicDisposition) ?? undefined;
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

    if (!basicProfile && !extendedProfile) {
      console.info(`No Profile Information For ${ethereumAddress}.`);
    } else {
      try {
        fields.push(...Object.keys(values));
        values.playerId = playerId;

        await client.UpsertProfile({
          objects: [values],
          updateColumns: fields as Profile_Update_Column[],
        });
      } catch (err) {
        if (
          !(err as Error).message.includes(
            'violates unique constraint "profile_username_key"',
          )
        ) {
          throw err;
        } else {
          // this is brittle and likely subject to exploit
          values.username = `${values.username}-${(
            did ?? ethereumAddress
          ).slice(-8)}`;

          await client.UpsertProfile({
            objects: [values],
            updateColumns: fields as Profile_Update_Column[],
          });
        }
      }
    }

    if (did) {
      const alsoKnownAs = ((await store.get('alsoKnownAs', did)) ??
        {}) as AlsoKnownAs;
      let { accounts = [] } = alsoKnownAs;

      accounts = [...accounts, extendedProfile?.accounts ?? []];

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
              accountLinks.push(service);
            }
          }
        }),
      );
    }
  } catch (err) {
    if (!(err as Error).message.includes('No DID')) {
      throw err;
    }
  }

  return {
    success: true,
    ceramic: CONFIG.ceramicURL,
    did,
    ethereumAddress,
    accountLinks,
    fields,
  };
};
