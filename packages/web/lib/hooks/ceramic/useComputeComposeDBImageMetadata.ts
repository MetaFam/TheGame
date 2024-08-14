import {
  ComposeDBImageMetadata,
  HasuraImageFieldKey,
  Maybe,
} from '@metafam/utils';
import { useEffect, useState } from 'react';

import { Player } from '#graphql/autogen/hasura-sdk';
import { computeImageMetadata, optimizedImage } from '#utils/imageHelpers';

export const useComputeComposeDBImageMetadata = (
  player: Player,
  fieldKey: HasuraImageFieldKey,
) => {
  const [isComputing, setComputing] = useState(false);
  const [imageMetadata, setImageMetadata] =
    useState<Maybe<ComposeDBImageMetadata>>(null);

  // compute image metadata from the profile fields
  useEffect(() => {
    const field =
      fieldKey === 'profileImageURL'
        ? player.profile?.profileImageURL
        : player.profile?.backgroundImageURL;
    if (field) {
      const url = optimizedImage(fieldKey, field);
      if (url) {
        setComputing(true);
        computeImageMetadata(url, field)
          .then((metadata) => {
            setImageMetadata(metadata);
          })
          .finally(() => {
            setComputing(false);
          });
      }
    }
  }, [fieldKey, player]);

  return {
    isComputing,
    imageMetadata,
  };
};
