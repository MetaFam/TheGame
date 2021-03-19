export const CONFIG = {
  graphqlURL: ((() => {
    const { NEXT_PUBLIC_GRAPHQL_URL: url, GRAPHQL_HOST: host } = (
      process.env
    )
    if (url) return url;
    if (host) {
      return `https://${host}.onrender.com/v1/graphql`;
    }
    return 'http://localhost:8080/v1/graphql';
  })()),
  infuraId:
    process.env.NEXT_PUBLIC_INFURA_ID || '781d8466252d47508e177b8637b1c2fd',
  openseaApiKey: process.env.NEXT_OPENSEA_API_KEY || undefined,
  brightIdAppUrl:
    process.env.NEXT_BRIGHTID_APP_URL || 'https://app.brightid.org',
  brightIdNodeUrl:
    process.env.NEXT_BRIGHTID_NODE_URL || 'http:%2f%2fnode.brightid.org',
};
