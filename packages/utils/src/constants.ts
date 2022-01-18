// DRY

export const WEB_PATH_JOIN_GUILD = 'join/guild';

export const DISCORD_BOT_CLIENT_ID = '804609082308034560';
export const DISCORD_BOT_PERMISSIONS = '268435456';
export const DISCORD_OAUTH_SCOPES = 'bot identify guilds';
export const DISCORD_OAUTH_CALLBACK_PATH = `${WEB_PATH_JOIN_GUILD}/auth`;
export const METAFAM_DISCORD_GUILD_ID = '629411177947987986';

export const SC_OUTPUT_BASE =
  'https://raw.githubusercontent.com/MetaFam/XP/gh-pages/';
export const SC_ACCOUNTS_FILE = `${SC_OUTPUT_BASE}output/accounts.json`;

export const CERAMIC_URL =
  process.env.CERAMIC_URL ||
  'https://ceramic.metagame.wtf' ||
  'https://d12-a-ceramic.3boxlabs.com';

export const IMGIX_TOKEN = process.env.IMGIX_TOKEN || '';
export const IMGIX_DOMAIN = process.env.IMGIX_DOMAIN || 'metafam.imgix.net';
export const IPFS_LINK_PATTERN =
  process.env.NEXT_IPFS_LINK_PATTERN ||
  'https://ipfs.infura.io/ipfs/{cid}/{path}' ||
  'https://{v1cid}.ipfs.dweb.link/{path}';
