import Box, { CollectiblesFavorite, Image } from '3box';

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
    imageURL: getImage(boxProfile?.image, {
      ar: '1:1',
      height: 200,
    }),
    coverImageURL: getImage(boxProfile?.coverPhoto, {
      height: 300,
    }),
    website: boxProfile.website,
    collectiblesFavorites: getCollectiblesFavourites(
      boxProfile.collectiblesFavorites,
    ),
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

type CollectibleAddress = {
  [network: string]: string;
};

function getCollectiblesFavourites(
  collectiblesFavorites: Array<CollectiblesFavorite> | null | undefined,
) {
  if (!collectiblesFavorites) return [];
  return collectiblesFavorites
    .map(({ address, token_id }) => ({
      address:
        typeof address === 'string'
          ? address
          : (address as CollectibleAddress).mainnet || null,
      tokenId: token_id,
    }))
    .filter((c) => !!c.address);
}
