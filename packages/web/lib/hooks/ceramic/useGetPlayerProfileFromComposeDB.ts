import { Maybe } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { Player, PlayerProfileFragment } from 'graphql/autogen/types';
import { queryPlayerProfile } from 'graphql/composeDB/queries/profile';
import { ComposeDBProfileQueryResult } from 'graphql/types';
import { CeramicError } from 'lib/errors';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

const genericFetchError = new CeramicError(
  'An unexpected error occurred when querying Ceramic.',
);

// If you pass a player here, this hook will return the profile data within
// this player if and only if the current user has no profile data in ComposeDB
export const useGetPlayerProfileFromComposeDB = (
  ceramicProfileNodeId?: Maybe<string>,
) => {
  const { composeDBClient } = useComposeDB();

  const [result, setResult] = useState<
    PlayerProfileFragment | undefined | null
  >();
  const [error, setError] = useState<Error | undefined>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (composeDBClient && ceramicProfileNodeId) {
      setFetching(true);
      const query = queryPlayerProfile(ceramicProfileNodeId);
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
  profileData: PlayerProfileFragment,
) => {
  const hasComposeDBData = Object.values(profileData).some((value) => !!value);
  if (hasComposeDBData) {
    // eslint-disable-next-line no-param-reassign
    return {
      ...player,
      profile: {
        id: 'dummy',
        player,
        playerId: player.id,
        ...profileData,
      },
    };
  }
  return player;
};
