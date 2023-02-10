import { ComposeClient } from '@composedb/client';
import {
  ComposeDBImageMetadata,
  composeDBProfileFieldAvailability,
  composeDBProfileFieldDescription,
  composeDBProfileFieldEmoji,
  composeDBProfileFieldExplorerType,
  composeDBProfileFieldFiveColorDisposition,
  composeDBProfileFieldHomeLocation,
  composeDBProfileFieldHomepageURL,
  composeDBProfileFieldName,
  composeDBProfileFieldPronouns,
  composeDBProfileFieldTimeZone,
  composeDBProfileFieldUsername,
  maskFor,
} from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { PlayerProfileFragment } from 'graphql/autogen/types';
import {
  composeDBDocumentProfileAvailability,
  composeDBDocumentProfileAvatar,
  composeDBDocumentProfileBackground,
  composeDBDocumentProfileDescription,
  composeDBDocumentProfileDisposition,
  composeDBDocumentProfileEmoji,
  composeDBDocumentProfileGenderIdentity,
  composeDBDocumentProfileHomeLocation,
  composeDBDocumentProfileHomepage,
  composeDBDocumentProfileName,
  composeDBDocumentProfileTimeZone,
  composeDBDocumentProfileUsername,
  queryPlayerProfile,
} from 'graphql/composeDB/queries/profile';
import { CeramicError } from 'lib/errors';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

import {
  parseFromModel,
  parseSingleFieldFromModel,
} from './useQueryFromComposeDB';

const genericFetchError = new CeramicError(
  'An unexpected error occurred when querying Ceramic.',
);

// If you pass a player here, this hook will return the profile data within
// this player if and only if the current user has no profile data in ComposeDB
export const useGetPlayerProfileFromComposeDB = (
  composeDBClient: ComposeClient,
) => {
  const [result, setResult] = useState<
    PlayerProfileFragment | undefined | null
  >();
  const [error, setError] = useState<Error | undefined>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (composeDBClient) {
      setFetching(true);
      composeDBClient
        .executeQuery(queryPlayerProfile)
        .then((response) => {
          if (response.data != null) {
            const composeDBProfileData = parseComposeDBProfileQueryResponse(
              response.data,
            );
            const hasComposeDBData = Object.values(composeDBProfileData).some(
              (value) => !!value,
            );
            if (!hasComposeDBData) {
              setResult(null);
            } else {
              setResult(composeDBProfileData);
            }
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
  }, [composeDBClient]);

  return { error, fetching, result };
};

export function parseComposeDBProfileQueryResponse(
  data: Record<string, unknown>,
): PlayerProfileFragment {
  const backgroundImage = parseFromModel<ComposeDBImageMetadata>(
    data,
    composeDBDocumentProfileBackground,
  );
  const avatarImage = parseFromModel<ComposeDBImageMetadata>(
    data,
    composeDBDocumentProfileAvatar,
  );
  const colorMask = parseSingleFieldFromModel<string>(
    data,
    composeDBDocumentProfileDisposition,
    composeDBProfileFieldFiveColorDisposition,
  );

  return {
    availableHours: parseSingleFieldFromModel<number>(
      data,
      composeDBDocumentProfileAvailability,
      composeDBProfileFieldAvailability,
    ),
    backgroundImageURL: backgroundImage?.original?.url,
    colorMask: maskFor(colorMask),
    description: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileDescription,
      composeDBProfileFieldDescription,
    ),
    emoji: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileEmoji,
      composeDBProfileFieldEmoji,
    ),
    explorerTypeTitle: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileDisposition,
      composeDBProfileFieldExplorerType,
    ),
    location: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileHomeLocation,
      composeDBProfileFieldHomeLocation,
    ),
    name: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileName,
      composeDBProfileFieldName,
    ),
    profileImageURL: avatarImage?.original?.url,
    pronouns: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileGenderIdentity,
      composeDBProfileFieldPronouns,
    ),
    timeZone: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileTimeZone,
      composeDBProfileFieldTimeZone,
    ),
    username: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileUsername,
      composeDBProfileFieldUsername,
    ),
    website: parseSingleFieldFromModel<string>(
      data,
      composeDBDocumentProfileHomepage,
      composeDBProfileFieldHomepageURL,
    ),
  };
}
