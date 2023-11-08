export const CONFIG = {
  appEnv: process.env.APP_ENV || 'development',
  graphqlURL:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8080/v1/graphql',
  infuraId:
    process.env.NEXT_PUBLIC_INFURA_ID || '781d8466252d47508e177b8637b1c2fd',
  brightIdAppURL:
    process.env.NEXT_BRIGHTID_APP_URL || 'https://app.brightid.org',
  brightIdNodeURL:
    process.env.NEXT_BRIGHTID_NODE_URL || 'http:%2f%2fnode.brightid.org',
  publicURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  gaId: process.env.NEXT_PUBLIC_GA4_ID,
  honeybadgerAPIKey: process.env.NEXT_PUBLIC_HONEYBADGER_API_KEY,
  get useHoneybadger() {
    return this.appEnv === 'production' && !!this.honeybadgerAPIKey;
  },
  userbackToken: process.env.NEXT_PUBLIC_USERBACK_TOKEN,
  discordAPIBaseUrl:
    process.env.DISCORD_API_BASE_URL || 'https://discord.com/api/v8',
  ceramicURL:
    process.env.NEXT_PUBLIC_CERAMIC_URL ||
    'https://ceramic.metagame.wtf' || // mainnet
    'https://ceramic-clay.3boxlabs.com', // testnet
  ceramicNetwork:
    process.env.NEXT_PUBLIC_CERAMIC_NETWORK || 'mainnet' || 'testnet-clay',
  googleDataAPIKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  web3StorageToken: process.env.WEB3_STORAGE_TOKEN,
  openseaAPIKey: process.env.OPENSEA_API_KEY,
  alchemyAPIKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  mainnetRPC: process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://eth.llamarpc.com',
  calendarEndpoint: '/api/events',
  gcal: {
    calendarId: process.env.NEXT_PUBLIC_GCAL_CALENDAR_ID,
    privateKey: process.env.GCAL_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.GCAL_CLIENT_EMAIL,
    projectNumber: process.env.GCAL_PROJECT_NUMBER,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    whitelist: [
      'https://*.metagame.wtf',
      'https://frontend-pr-*-mjhnbmqqna-uk.a.run.app',
    ],
  },
};
