/* eslint-disable no-console */
import {
  BasicProfile,
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic';
import { DataModel } from '@glazed/datamodel';
import { DIDDataStore } from '@glazed/did-datastore';
import {
  AllProfileFields,
  BasicProfileImages,
  BasicProfileStrings,
  ExtendedProfile,
  ExtendedProfileImages,
  extendedProfileModel,
  ExtendedProfileObjects,
  ExtendedProfileStrings,
  HasuraEPObjects,
  HasuraImageSourcedProps,
  HasuraProfileProps,
  HasuraStringProps,
  Maybe,
  simplifyAliases,
  Values,
} from '@metafam/utils';
import { CeramicError, handleCeramicAuthenticationError } from 'lib/errors';
import { useProfileField } from 'lib/hooks/useField';
import { useUser } from 'lib/hooks/useUser';
import { useWeb3 } from 'lib/hooks/useWeb3';
import { useRouter } from 'next/router';
import { ReactElement, useCallback } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { isEmpty } from 'utils/objectHelpers';
import { dispositionFor } from 'utils/playerHelpers';

export const useSaveCeramicProfile = ({
  debug = false,
  setStatus = () => {},
  fields = Object.keys(AllProfileFields),
}: {
  debug?: boolean;
  setStatus?: (msg?: Maybe<ReactElement | string>) => void;
  fields?: Array<string>;
} = {}) => {
  const router = useRouter();
  const { ceramic } = useWeb3();
  const { user } = useUser();

  debug ||= !!router.query.debug; // eslint-disable-line no-param-reassign

  const setters = Object.fromEntries(
    fields.map((key) => {
      const { setter = null } =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useProfileField({
          field: key,
          player: user,
        });
      return [key, setter];
    }),
  );

  const save = useCallback(
    async ({
      values = {},
      images = {},
    }: {
      values?: HasuraStringProps & HasuraEPObjects;
      images?: HasuraImageSourcedProps;
    }) => {
      if (!ceramic) {
        throw new CeramicError(
          'Unable to connect to the Ceramic API to save changes.',
        );
      }

      if (!ceramic.did?.authenticated) {
        try {
          setStatus('Authenticating DID…');
          await ceramic.did?.authenticate();
        } catch (err) {
          handleCeramicAuthenticationError(err as Error);
        }
      }

      if (debug) {
        console.debug(`Connected DID: ${ceramic.did?.id}`);
      }

      const vals: HasuraProfileProps = { ...values };

      const aliases = simplifyAliases([
        basicProfileModel,
        extendedProfileModel,
      ]);
      const model = new DataModel({ ceramic, aliases });
      const store = new DIDDataStore({ ceramic, model });

      // empty string fails validation
      ['countryCode', 'birthDate'].forEach((prop) => {
        const key = prop as keyof typeof BasicProfileStrings;
        if (vals[key] === '') {
          delete vals[key];
        }
      });

      const { countryCode: code }: { countryCode?: string } = vals;
      if (code?.length === 2) {
        vals.countryCode = code.toUpperCase();
      } else if (code) {
        throw new CeramicError(
          `Country Code “${code}” is not the required two letters.`,
        );
      }

      const basic: BasicProfile = {};
      const extended: ExtendedProfile = {};

      setStatus('Updating Basic Profile…');

      Object.entries(BasicProfileStrings).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof BasicProfileStrings>;
        const toKey = hasuraId as keyof typeof BasicProfileStrings;
        if (vals[toKey] !== undefined) {
          basic[fromKey] = vals[toKey] ?? undefined;
        }
      });

      Object.entries(BasicProfileImages).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof BasicProfileImages>;
        const toKey = hasuraId as keyof typeof BasicProfileImages;
        if (images[toKey] !== undefined) {
          basic[fromKey] = images[toKey] ?? undefined;
          vals[toKey] = images[toKey]?.original.src ?? '';
        }
      });

      if (!isEmpty(basic)) {
        const basRes = await store.merge('basicProfile', basic);
        if (debug) {
          console.debug('Basic Profile:', basRes.toUrl());
        }
      }

      setStatus('Updating Extended Profile…');

      Object.entries(ExtendedProfileStrings).forEach(
        ([hasuraId, ceramicId]) => {
          const fromKey = ceramicId as Values<typeof ExtendedProfileStrings>;
          const toKey = hasuraId as keyof typeof ExtendedProfileStrings;
          if (vals[toKey] !== undefined) {
            extended[fromKey] = vals[toKey];
          }
        },
      );

      Object.entries(ExtendedProfileImages).forEach(([hasuraId, ceramicId]) => {
        const fromKey = ceramicId as Values<typeof ExtendedProfileImages>;
        const toKey = hasuraId as keyof typeof ExtendedProfileImages;
        if (images[toKey] !== undefined) {
          extended[fromKey] = images[toKey] ?? undefined;
          vals[toKey] = images[toKey]?.original.src ?? '';
        }
      });

      Object.entries(ExtendedProfileObjects).forEach(
        ([hasuraId, ceramicId]) => {
          const fromKey = ceramicId as Values<typeof ExtendedProfileObjects>;
          const toKey = hasuraId as keyof typeof ExtendedProfileObjects;
          if (vals[toKey] !== undefined) {
            switch (fromKey) {
              case 'availableHours': {
                extended[fromKey] = vals[toKey] as number;
                break;
              }
              case 'magicDisposition': {
                extended[fromKey] = dispositionFor(vals.colorMask) ?? undefined;
                break;
              }
              default: {
                console.warn(`Unknown Profile Key: "${fromKey}"`);
              }
            }
          }
        },
      );

      if (debug) {
        console.debug({ values, images, basic, extended });
      }

      if (!isEmpty(extended)) {
        const extRes = await store.merge('extendedProfile', extended);
        if (debug) {
          console.debug('Extended Profile:', extRes.toUrl());
        }
      }

      setStatus('Updating Local State…');
      Object.entries(vals).forEach(([hasuraId, value]) => {
        if (setters[hasuraId] != null) {
          if (debug) {
            console.debug(`Setting ${hasuraId} to “${value}”.`);
          }
          setters[hasuraId]?.(value);
        } else {
          console.warn(`Missing setter for ${hasuraId}.`, { setters });
        }
      });

      return vals;
    },
    [ceramic, debug, setStatus, setters],
  );

  return save;
};
