export interface DiscordAccessTokenResponse {
  statusCode: number;
  error?: string;
  oauthResponse?: OAuth2CodeExchangeResponse;
}

export interface OAuth2CodeExchangeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
