// DRY

export const WEB_PATH_JOIN_GUILD = 'join/guild';

export const DISCORD_BOT_CLIENT_ID = '804609082308034560';
export const DISCORD_BOT_PERMISSIONS = '268435456';
export const DISCORD_OAUTH_SCOPES = 'bot identify guilds';
export const DISCORD_OAUTH_CALLBACK_PATH = `${WEB_PATH_JOIN_GUILD}/auth`;

export const SC_OUTPUT_BASE =
  'https://raw.githubusercontent.com/MetaFam/XP/gh-pages/';
export const SC_ACCOUNTS_FILE = `${SC_OUTPUT_BASE}output/accounts.json`;

export const CERAMIC_URL =
  process.env.CERAMIC_URL || 'https://d12-a-ceramic.3boxlabs.com';
