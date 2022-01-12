import { Constants } from '@metafam/utils';
import { RequestInfo, RequestInit } from 'node-fetch';
import { URLSearchParams } from 'url';

import { CONFIG } from './config';
import {
  DiscordAccessTokenResponse,
  OAuth2CodeExchangeResponse,
} from './types';

// This is necessary to prevent transpilation to a require statement
// eslint-disable-next-line @typescript-eslint/no-implied-eval
const importDynamic = new Function('modulePath', 'return import(modulePath)');

const fetch = async (url: RequestInfo, init?: RequestInit | undefined) => {
  const { default: nodeFetch } = await importDynamic('node-fetch');
  return nodeFetch(url, init);
};

export const tokenRequestData = {
  client_id: Constants.DISCORD_BOT_CLIENT_ID,
  client_secret: CONFIG.discordBotClientSecret,
  grant_type: 'authorization_code',
  redirect_uri: `${CONFIG.frontendUrl}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`,
};

export const exchangeCodeForAccessToken = async (
  code: string,
): Promise<DiscordAccessTokenResponse> => {
  const data = {
    ...tokenRequestData,
    code,
  };

  const discordResponse = await fetch(
    `${CONFIG.discordApiBaseUrl}/oauth2/token`,
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
    const parsedBody = (await discordResponse.json()) as OAuth2CodeExchangeResponse;
    response.oauthResponse = parsedBody;
  } else {
    response.error = discordResponse.statusText;
  }

  return response;
};
