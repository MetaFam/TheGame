import {
  ComposeDBField,
  ComposeDBImageMetadata,
  ComposeDBProfile,
  composeDBProfileFieldFiveColorDisposition,
  isComposeDBImageField,
  maskFor,
  Maybe,
  profileMapping,
} from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { buildPlayerProfileQuery } from 'graphql/composeDB/queries/profile';
import { ComposeDBProfileQueryResult } from 'graphql/types';
import { CeramicError } from 'lib/errors';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

import { useComposeDB } from './useComposeDB';

const genericFetchError = new CeramicError(
  'An unexpected error occurred when querying Ceramic.',
);

// If you pass a player here, this hook will return the profile data within
// this player if and only if the current user has no profile data in ComposeDB
export const useGetPlayerProfileFromComposeDB = (
  ceramicProfileNodeId?: Maybe<string>,
) => {
  const { composeDBClient } = useComposeDB();

  const [result, setResult] = useState<ComposeDBProfile | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (composeDBClient && ceramicProfileNodeId) {
      setFetching(true);
      const query = buildPlayerProfileQuery(ceramicProfileNodeId);
      composeDBClient
        .executeQuery(query)
        .then((response) => {
          if (response.data != null) {
            const composeDBProfileData = (
              response.data as ComposeDBProfileQueryResult
            ).node;
            setResult(composeDBProfileData);
          } else if (response.errors) {
            setError(response.errors[0]);
          } else {
            setError(genericFetchError);
          }
        })
        .catch((err) => {
          errorHandler(err);
          setError(genericFetchError);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [ceramicProfileNodeId, composeDBClient]);

  return { error, fetching, result };
};

export const hydratePlayerProfile = (
  player: Player,
  profileData: ComposeDBProfile,
): Player => {
  const hasComposeDBData = Object.values(profileData).some((value) => !!value);
  if (hasComposeDBData) {
    const hasuraProfile = composeDBToHasuraProfile(profileData);
    return {
      ...player,
      profile: {
        id: 'ceramic-profile',
        player,
        playerId: player.id,
        ...hasuraProfile,
      },
    };
  }
  return player;
};

export const composeDBToHasuraProfile = (
  composeDBProfile: ComposeDBProfile,
) => {
  // todo we should be able to make this typesafe
  const hasuraProfile: Record<string, unknown> = {};

  Object.entries(composeDBProfile).forEach(([key, value]) => {
    const match = Object.entries(profileMapping).find(
      ([, composeDBKey]) => composeDBKey === key,
    ) as [keyof typeof profileMapping, ComposeDBField];

    const hasuraKey = match[0];

    // Some fields required custom translations
    let hasuraValue = value;
    if (value && key === composeDBProfileFieldFiveColorDisposition) {
      const maskNumber = maskFor(value as string);
      if (maskNumber != null) {
        hasuraValue = maskNumber;
      }
    } else if (value && isComposeDBImageField(key)) {
      hasuraValue = (value as ComposeDBImageMetadata).url;
    }
    hasuraProfile[hasuraKey] = hasuraValue;
  });
  return hasuraProfile;
};
