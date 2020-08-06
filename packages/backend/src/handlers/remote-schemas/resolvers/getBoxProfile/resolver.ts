import Box, { BoxProfile } from '3box';

import { CONFIG } from '../../../../config';
import { QueryResolvers } from '../../autogen/types';

export const getBoxProfile: QueryResolvers['getBoxProfile'] = async (
  _,
  { address },
) => {
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
    imageUrl: getProfilePicture(boxProfile),
  };
};

function getProfilePicture(boxProfile: BoxProfile) {
  const imageHash =
    boxProfile &&
    boxProfile.image &&
    boxProfile.image[0] &&
    boxProfile.image[0].contentUrl &&
    boxProfile.image[0].contentUrl['/'];
  if (imageHash) {
    return `${CONFIG.ipfsEndpoint}/ipfs/${imageHash}`;
  }
  return 'https://i.imgur.com/RXJO8FD.png';
}
