/* eslint-disable no-console */

import {
  BasicProfile,
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic';
import { ModelManager } from '@glazed/devtools';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
import { useToast } from '@metafam/ds';
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
  Values,
} from '@metafam/utils';
import { useUser, useWeb3 } from 'lib/hooks';
import { useProfileField } from 'lib/store';
import { useCallback } from 'react';

import { isEmpty } from './objectHelpers';
import { dispositionFor } from './playerHelpers';

export const useSaveCeramicProfile = ({
  debug = false,
}: {
  debug: boolean;
}) => {
  const { ceramic } = useWeb3();
  const { user } = useUser();
  const toast = useToast();

  const setters = Object.fromEntries(
    Object.keys(AllProfileFields).map((key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setter } = useProfileField({
        field: key,
        player: user,
        owner: true,
      });
      return [key, setter];
    }),
  );

  const save = useCallback(
    async ({
      values = {},
      images = {},
      setStatus = () => {},
    }: {
      values?: HasuraStringProps & HasuraEPObjects;
      images?: HasuraImageSourcedProps;
      setStatus?: (msg: string) => void;
    }) => {
      if (!ceramic) {
        toast({
          title: 'Ceramic Connection Error',
          description: 'Unable to connect to the Ceramic API to save changes.',
          status: 'error',
          isClosable: true,
          duration: 8000,
        });
        return null;
      }

      if (!ceramic.did?.authenticated) {
        setStatus('Authenticating DID…');
        await ceramic.did?.authenticate();
      }

      const vals: HasuraProfileProps = { ...values };

      const cache = new Map();
      const loader = new TileLoader({ ceramic, cache });
      const manager = new ModelManager(ceramic);
      manager.addJSONModel(basicProfileModel);
      manager.addJSONModel(extendedProfileModel);

      const store = new DIDDataStore({
        ceramic,
        loader,
        model: await manager.toPublished(),
      });

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
        toast({
          title: 'Country Code Error',
          description: `Country Code "${code}" is not the required two letters.`,
          status: 'error',
          isClosable: true,
          duration: 8000,
        });

        delete vals.countryCode;
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
          vals[toKey] = images[toKey]?.original.src;
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
          extended[fromKey] = images[toKey];
          vals[toKey] = images[toKey]?.original.src;
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
              case 'colorDisposition': {
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
    [ceramic, debug, setters, toast],
  );

  return save;
};
