export const CONFIG = {
  environment: process.env.NODE_ENV || 'development',
  graphqlURL: (() => {
    const { NEXT_PUBLIC_GRAPHQL_URL: url, NEXT_PUBLIC_GRAPHQL_HOST: host } =
      process.env;

    if (url) return url;
    if (host) {
      return `https://${host}.onrender.com/v1/graphql`;
    }
    return 'http://localhost:8080/v1/graphql';
  })(),
  infuraId:
    process.env.NEXT_PUBLIC_INFURA_ID || '781d8466252d47508e177b8637b1c2fd',
  brightIdAppURL:
    process.env.NEXT_BRIGHTID_APP_URL || 'https://app.brightid.org',
  brightIdNodeURL:
    process.env.NEXT_BRIGHTID_NODE_URL || 'http:%2f%2fnode.brightid.org',
  publicURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  gaId: process.env.NEXT_PUBLIC_GA4_ID || 'G-B1NKK3Q1BP',
  honeybadgerApiKey:
    process.env.NEXT_PUBLIC_HONEYBADGER_API_KEY ||
    'hbp_Z4027J7qYTktQkqvUHcOHJqIbpjpWD30A1kd',
  userbackToken:
    process.env.NEXT_PUBLIC_USERBACK_TOKEN ||
    '37882|74240|mjn1zXGiYaozZR6qmqFfjl9Sk',
  discordApiBaseUrl:
    process.env.DISCORD_API_BASE_URL || 'https://discord.com/api/v8',
  ceramicURL:
    process.env.NEXT_PUBLIC_CERAMIC_URL ||
    'https://ceramic.metagame.wtf' || // mainnet
    'https://ceramic-clay.3boxlabs.com' || // testnet
    'https://d12-a-ceramic.3boxlabs.com', // mainnet by 3Box
  ceramicNetwork:
    process.env.NEXT_PUBLIC_CERAMIC_NETWORK || 'mainnet' || 'testnet-clay',
  calendarId: 'nih59ktgafmm64ed4qk6ue8vv4@group.calendar.google.com',
  googleDataApiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  web3StorageToken: process.env.WEB3_STORAGE_TOKEN || '',
  openseaApiKey: process.env.OPENSEA_API_KEY || '',
  alchemyRpcUrl: process.env.NEXT_ALCHEMY_ENDPOINT || '',
  alchemyApiKey:
    process.env.NEXT_ALCHEMY_API_KEY || 'eoEduI_LCCxfMPe9MKrpvly-qWtBBY7I',
  hostName: 'https://metagame.wtf',
  mainnetRPC: process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://eth.llamarpc.com',
};
