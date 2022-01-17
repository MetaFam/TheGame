export const CONFIG = {
  graphqlURL: (() => {
    const {
      NEXT_PUBLIC_GRAPHQL_URL: url,
      NEXT_PUBLIC_GRAPHQL_HOST: host,
    } = process.env;

    if (url) return url;
    if (host) {
      return `https://${host}.onrender.com/v1/graphql`;
    }
    return 'http://localhost:8080/v1/graphql';
  })(),
  infuraId:
    process.env.NEXT_PUBLIC_INFURA_ID || '781d8466252d47508e177b8637b1c2fd',
  openseaApiKey: process.env.NEXT_OPENSEA_API_KEY,
  brightIdAppURL:
    process.env.NEXT_BRIGHTID_APP_URL || 'https://app.brightid.org',
  brightIdNodeURL:
    process.env.NEXT_BRIGHTID_NODE_URL || 'http:%2f%2fnode.brightid.org',
  publicURL: process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000',
  gaId: process.env.NEXT_PUBLIC_GA4_ID,
  clarityId: process.env.NEXT_CLARITY_ID,
  discordApiBaseUrl:
    process.env.DISCORD_API_BASE_URL || 'https://discord.com/api/v8',
  // mainnet
  ceramicURL:
    process.env.NEXT_CERAMIC_URL ||
    'https://ceramic.metagame.wtf' || // mainnet
    'https://ceramic-clay.3boxlabs.com' || // testnet
    'https://d12-a-ceramic.3boxlabs.com',
  ceramicNetwork:
    process.env.NEXT_CERAMIC_NETWORK || 'mainnet' || 'testnet-clay',
  actionsURL: process.env.NEXT_ACTIONS_URL || 'http://localhost:4000',
  calendarId: 'nih59ktgafmm64ed4qk6ue8vv4@group.calendar.google.com',
  googleDataApiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  ipfsLinkPattern:
    process.env.NEXT_IPFS_LINK_PATTERN ||
    // eslint-disable-next-line no-template-curly-in-string
    'https://{cid}.ipfs.dweb.link/{path}',
  web3StorageToken:
    process.env.WEB3_STORAGE_TOKEN ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0OWIyMGIyMzVGY2E3N0QzRURlZWFDMzlDODkyZkVENmUzOTU5OTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzA3MDMyMDg0ODEsIm5hbWUiOiJNeU1ldGEifQ.q7_i_XmkIMb6_6u9pNI6tkNUq0vhiJ0e1oV8GLdeez0',
};
