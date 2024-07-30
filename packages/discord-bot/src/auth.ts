import { Constants } from '@metafam/utils';
import { URLSearchParams } from 'url';

import { CONFIG } from './config.js';
import {
  DiscordAccessTokenResponse,
  OAuth2CodeExchangeResponse,
} from './types.js';

const tokenRequestData = {
  client_id: Constants.DISCORD_BOT_CLIENT_ID,
  client_secret: CONFIG.botSecret,
  grant_type: 'authorization_code',
  redirect_uri: `${CONFIG.frontendURL}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`,
};

export const exchangeCodeForAccessToken = async (
  code: string,
): Promise<DiscordAccessTokenResponse> => {
  const data = { ...tokenRequestData, code };

  const discordResponse = await fetch(
    `${CONFIG.apiBaseURL}/oauth2/token`,
    {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  const response: DiscordAccessTokenResponse = {
    statusCode: discordResponse.status,
  };

  if (discordResponse.ok) {
    response.oauthResponse =
      (await discordResponse.json()) as OAuth2CodeExchangeResponse;
  } else {
    response.error = discordResponse.statusText;
  }

  return response;
};
