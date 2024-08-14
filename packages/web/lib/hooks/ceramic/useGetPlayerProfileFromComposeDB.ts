import {
  ComposeDBProfile,
  composeDBToHasuraProfile,
  Maybe,
} from '@metafam/utils';
import { ExecutionResult } from 'graphql';
import { useEffect, useState } from 'react';

import { Player } from '#graphql/autogen/hasura-sdk';
import { buildPlayerProfileQuery } from '#graphql/composeDB/queries/profile';
import { ComposeDBProfileQueryResult } from '#graphql/types';
import { CeramicError } from '#lib/errors';
import { errorHandler } from '#utils/errorHandler';

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
        .then((response: ExecutionResult) => {
          const composeDBProfileData =
            response.data as ComposeDBProfileQueryResult;
          if (composeDBProfileData?.node != null) {
            setResult(composeDBProfileData.node);
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
