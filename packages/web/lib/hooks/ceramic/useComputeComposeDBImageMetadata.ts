import {
  ComposeDBImageMetadata,
  HasuraImageFieldKey,
  Maybe,
} from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { useEffect, useState } from 'react';
import { computeImageMetadata, optimizedImage } from 'utils/imageHelpers';

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
    if (field && !imageMetadata && !isComputing) {
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
  }, [fieldKey, imageMetadata, isComputing, player]);

  return {
    isComputing,
    imageMetadata,
  };
};
