import Box, { Image } from '3box';

import { CONFIG } from '../../../../config';
import {
  optimizeImage,
  OptimizeImageParams,
} from '../../../../lib/imageHelpers';
import { QueryResolvers } from '../../autogen/types';

export const getBoxProfile: QueryResolvers['getBoxProfile'] = async (
  _,
  { address },
) => {
  if (!address) return null;

  const boxProfile = await Box.getProfile(address);

  if (Object.keys(boxProfile).length === 0) {
    return null;
  }

  return {
    ethereumAddress: address,
    name: boxProfile.name,
    description: boxProfile.description,
    location: boxProfile.location,
    job: boxProfile.job,
    emoji: boxProfile.emoji,
    imageUrl: getImage(boxProfile?.image, {
      ar: '1:1',
      height: 200,
    }),
    coverImageUrl: getImage(boxProfile?.coverPhoto, {
      height: 300,
    }),
    website: boxProfile.website,
  };
};

function getImage(
  image: Image[] | null | undefined,
  opts: OptimizeImageParams,
) {
  const imageHash = image?.[0]?.contentUrl?.['/'];
  if (imageHash) {
    return optimizeImage(`${CONFIG.ipfsEndpoint}/ipfs/${imageHash}`, opts);
  }
  return '';
}
