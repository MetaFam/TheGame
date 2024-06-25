import { Snowflake } from 'discord.js';

export interface DiscordAccessTokenResponse {
  statusCode: number;
  error?: string;
  oauthResponse?: OAuth2CodeExchangeResponse;
}

// see https://discord.com/developers/docs/topics/oauth2#advanced-bot-authorization-extended-bot-authorization-access-token-example
export interface OAuth2CodeExchangeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  guild: PartialGuild;
}

export interface PartialAuthorizationResponse {
  user: DiscordAuthorizedUser;
}

export interface DiscordAuthorizedUser {
  id: Snowflake;
  username: string;
}

export interface PartialGuild {
  id: Snowflake;
  name: string;
  icon?: string | null;
  owner_id: Snowflake;
  features: string[];
  roles: PartialRole[];
}

export interface PartialRole {
  id: Snowflake;
  name: string;
  permissions: string;
}

export interface GuildDiscordMetadata {
  inviteUrl?: string;
  rankRoleIds?: { [roleName: string]: Snowflake };
  playerRoles?: { [roleName: string]: Snowflake };
  refreshToken?: string;
  allRoleIds?: Snowflake[];
  logoHash?: string;
  membershipRoleIds?: Snowflake[];
  administratorRoleIds?: Snowflake[];
}
