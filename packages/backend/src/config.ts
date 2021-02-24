interface IConfig {
  port: number;
  graphqlURL: string;
  daoHausGraphqlURL: string;
  adminKey: string;
  ipfsEndpoint: string;
  imgixToken: string;
  infuraId: string;
  pSEEDAddress: string;
  brightIdContext: string;
  brightIdNodeUrl: string;
}

function parseEnv<T extends string | number>(
  v: string | undefined,
  defaultValue: T,
): T {
  if (!v) return defaultValue;

  if (typeof defaultValue === 'number') {
    return Number(v) as T;
  }
  return v as T;
}

export const CONFIG: IConfig = {
  port: parseEnv(process.env.PORT, 4000),
  graphqlURL: parseEnv(
    process.env.GRAPHQL_URL,
    'http://localhost:8080/v1/graphql',
  ),
  daoHausGraphqlURL: parseEnv(
    process.env.DAOHAUS_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus',
  ),
  adminKey: parseEnv(
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    'metagame_secret',
  ),
  ipfsEndpoint: parseEnv(process.env.IPFS_ENDPOINT, 'https://ipfs.infura.io'),
  imgixToken: parseEnv(process.env.IMGIX_TOKEN, ''),
  pSEEDAddress: parseEnv(
    process.env.PSEED_ADDRESS,
    '0x34a01c0a95b0592cc818cd846c3cf285d6c85a31',
  ),
  infuraId: parseEnv(
    process.env.NEXT_PUBLIC_INFURA_ID,
    '781d8466252d47508e177b8637b1c2fd',
  ),
  brightIdContext: parseEnv(process.env.BRIGHTID_CONTEXT, 'MetaGame'),
  brightIdNodeUrl: parseEnv(
    process.env.BRIGHTID_NODE_URL,
    'https://app.brightid.org',
  ),
};
