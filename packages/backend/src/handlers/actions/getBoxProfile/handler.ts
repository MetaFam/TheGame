import { Request, Response } from 'express';
import Box from '3box';

import config from '../../../config';

const handler = async (req: Request, res: Response) => {

  const { address } = req.body.input;
  const boxProfile = await Box.getProfile(address);

  if(Object.keys(boxProfile).length === 0) {
    return res.json({});
  }

  const parsedProfile: BoxProfile = {
    name: boxProfile.name,
    description: boxProfile.description,
    location: boxProfile.location,
    job: boxProfile.job,
    emoji: boxProfile.emoji,
    imageUrl: getProfilePicture(boxProfile),
  };

  return res.json(parsedProfile);
};

function getProfilePicture(boxProfile: any) {
  const imageHash = boxProfile && boxProfile.image && boxProfile.image[0] && boxProfile.image[0].contentUrl && boxProfile.image[0].contentUrl['/'];
  if(imageHash) {
    return `${config.ipfsEndpoint}/ipfs/${imageHash}`;
  } else {
    return 'https://i.imgur.com/RXJO8FD.png';
  }
}

export default handler;

/**


 type Query {
   get3BoxProfile(address: String): 3BoxProfile
 }

 type 3BoxProfile {
   name: String
   description: String
   location: String
   job: String
   emoji: String
 }


 **/
