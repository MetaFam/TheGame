import { exchangeCodeForAccessToken } from '@metafam/discord-bot';
import { CONSTANTS } from '@metafam/utils';
import { Request, Response } from 'express';

import { CONFIG } from '../../../config';

export const handleOAuthCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log('Discord OAuth Callback URL called!');
  console.log(req.query);

  // when auth request is denied, this still gets called with `error=access_denied` and `error_description` and `state` parameters
  if (req.query.error) {
    res.redirect(`${CONFIG.frontendUrl}/${CONSTANTS.WEB_PATH_JOIN_GUILD}?error=${req.query.error}`);
    return;
  }
  // when confirmed, `code` parameter is sent.
  if (req.query.code) {
    const response = await exchangeCodeForAccessToken(req.query.code as string);
    if (response.statusCode !== 200) {
      console.error(`${response.statusCode}: ${response.error}`);
      res.redirect(`${CONFIG.frontendUrl}/${CONSTANTS.WEB_PATH_JOIN_GUILD}?error=oauth-unexpected-error`);
      return;
    }
    // persist guild info fetched in this request (or make another request to get the applicable info)
    

    // set status = pending 
    // if a guild with the same server ID already exists, redirect to the appropriate page on the frontend 
    // (unfortunately this doesn't yet exist, maybe just redirect to /guilds with a message)
    // persist refresh token to guild discord_metadata

    // then redirect 

    // this is an example of the response https://discord.com/developers/docs/topics/oauth2#advanced-bot-authorization-extended-bot-authorization-access-token-example
    // console.log(req.query.guild?.roles);
    
  }
};
