import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { ComposeClient } from '@composedb/client';
import {
  composeDBDefinition,
  ComposeDBProfile,
  composeDBToHasuraProfile,
} from '@metafam/utils';

import { CONFIG } from '../../../config.js';
import {
  Profile_Update_Column,
  UpdateIdxProfileResponse,
} from '../../../lib/autogen/hasura-sdk.js';
import { client } from '../../../lib/hasuraClient.js';

const composeDBClient = new ComposeClient({
  ceramic: CONFIG.ceramicURL,
  definition: composeDBDefinition,
});

export const updatePlayerFromComposeDB = async (
  playerId: string,
): Promise<UpdateIdxProfileResponse> => {
  const accountLinks: string[] = [];
  const fields: string[] = [];
  const { player_by_pk: player } = await client.GetPlayer({ playerId });

  if (!player) {
    throw new Error(`Unknown Player: "${playerId}"`);
  } else {
    console.debug(`Updating Profile Cache For ${player.ethereumAddress}`);
  }

  const { ethereumAddress, ceramicProfileId } = player;

  if (ceramicProfileId == null) {
    // they are not yet in ComposeDB; ignore
    return {
      success: false,
      ceramic: CONFIG.ceramicURL,
    };
  }

  const modelInstanceDoc = await composeDBClient.context.loadDoc(
    ceramicProfileId,
  );
  if (modelInstanceDoc == null) {
    // their profile document wasn't found, now what? Why would this happen?
    // should we dereference the ceramicProfileId from their player record?
    return {
      success: false,
      ceramic: CONFIG.ceramicURL,
    };
  }
  const values = composeDBToHasuraProfile(
    modelInstanceDoc.content as ComposeDBProfile,
  );

  let did = null;

  try {
    ({ did } = await Caip10Link.fromAccount(
      composeDBClient.context.ceramic,
      // mainnet; the site prompts them to switch if necessary
      `${ethereumAddress.toLowerCase()}@eip155:1`,
    ));

    try {
      fields.push(...Object.keys(values));
      values.playerId = playerId;

      await client.UpsertProfile({
        objects: [values],
        updateColumns: fields as Profile_Update_Column[],
      });
    } catch (err) {
      if (
        (err as Error).message.includes(
          'violates unique constraint "profile_username_key"',
        )
      ) {
        // this is brittle and likely subject to exploit
        values.username = `${values.username}-${(did ?? ethereumAddress).slice(
          -8,
        )}`;

        await client.UpsertProfile({
          objects: [values],
          updateColumns: fields as Profile_Update_Column[],
        });
      } else {
        throw err;
      }
    }

    // if (did) {
    //   const alsoKnownAs = ((await store.get('alsoKnownAs', did)) ??
    //     {}) as AlsoKnownAs;
    //   const { accounts = [] } = alsoKnownAs;

    //   await Promise.all(
    //     accounts?.map(async ({ host, id: username }: Account) => {
    //       const service = host
    //         ?.replace(/\.com$/, '')
    //         .toUpperCase() as AccountType_Enum;
    //       if (!service) {
    //         console.error(`No hostname for AlsoKnownAs: "${host}"`);
    //       } else {
    //         // If the account has been registered previously, this will
    //         // destructively assign it to the current user removing any
    //         // other users.
    //         //
    //         // ToDo: Examine the JWT to validate that it came from a
    //         // trusted source. Specifically, either the IdentityLink
    //         // service backing //self.id or one established by MetaGame
    //         const { insert_player_account: insert } =
    //           await client.UpsertAccount({
    //             objects: [
    //               {
    //                 playerId,
    //                 type: service,
    //                 identifier: username,
    //               },
    //             ],
    //           });
    //         if (insert?.affected_rows === undefined) {
    //           // eslint-disable-next-line no-console
    //           console.warn(
    //             `Unable to insert ${service} user ${username} for playerId ${playerId}.`,
    //           );
    //         } else if (insert.affected_rows > 0) {
    //           accountLinks.push(service);
    //         }
    //       }
    //     }),
    //   );
    // }
  } catch (err) {
    if (!(err as Error).message.includes('No DID')) {
      throw err;
    }
  }

  const ret = {
    success: true,
    ceramic: CONFIG.ceramicURL,
    did,
    ethereumAddress,
    accountLinks,
    fields,
  };

  return ret;
};
