import { Constants } from '@metafam/utils';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

import { CONFIG } from './config';
import { DiscordAccessTokenResponse } from './types';

export const tokenRequestData = {
  client_id: CONFIG.discordBotClientId,
  client_secret: CONFIG.discordBotClientSecret,
  grant_type: 'authorization_code',
  redirect_uri: `${CONFIG.frontendUrl}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`,
  scope: Constants.DISCORD_OAUTH_SCOPES,
}

export const exchangeCodeForAccessToken = async (code: string): Promise<DiscordAccessTokenResponse> => {
  const data = {
    ...tokenRequestData,
    code,
  }
  
  const discordResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const response: DiscordAccessTokenResponse = {
    statusCode: discordResponse.status,
  };

  if (discordResponse.ok) {
    const parsedBody = await discordResponse.json();
    response.oauthResponse = parsedBody;
  } else {
    response.error = discordResponse.statusText;
  }

  return response;
}
