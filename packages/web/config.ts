export const CONFIG = {
  graphqlURL:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8080/v1/graphql',
  infuraId:
    process.env.NEXT_PUBLIC_INFURA_ID || '781d8466252d47508e177b8637b1c2fd',
  openseaApiKey: process.env.NEXT_OPENSEA_API_KEY || undefined,
};
