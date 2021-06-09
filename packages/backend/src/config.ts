interface IConfig {
  port: number;
  graphqlURL: string;
  daoHausGraphqlURL: string;
  daoHausPolygonGraphqlURL: string;
  daoHausXdaiGraphqlURL: string;
  seedGraphqlURL: string;
  githubApiToken: string;
  adminKey: string;
  ipfsEndpoint: string;
  imgixToken: string;
  infuraId: string;
  pSEEDAddress: string;
  brightIdAppUrl: string;
  sourceCredLedgerBranch: string;
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
  graphqlURL: (() => {
    const { GRAPHQL_URL: url, GRAPHQL_HOST: host } = process.env;

    if (url) return url;
    if (host) {
      return `https://${host}.onrender.com/v1/graphql`;
    }
    return 'http://localhost:8080/v1/graphql';
  })(),
  seedGraphqlURL: parseEnv(
    process.env.SEED_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/dan13ram/seed-graph',
  ),
  daoHausGraphqlURL: parseEnv(
    process.env.DAOHAUS_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus',
  ),
  daoHausPolygonGraphqlURL: parseEnv(
    process.env.DAOUHAUS_POLYGON_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-matic',
  ),
  daoHausXdaiGraphqlURL: parseEnv(
    process.env.DAOUHAUS_XDAI_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
  ),
  adminKey: parseEnv(
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    'metagame_secret',
  ),
  githubApiToken: parseEnv(process.env.GITHUB_API_TOKEN, ''),
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
  brightIdAppUrl: parseEnv(
    process.env.NEXT_BRIGHTID_APP_URL,
    'https://app.brightid.org',
  ),
  sourceCredLedgerBranch: parseEnv(
    process.env.SOURCECRED_LEDGER_BRANCH,
    'staging', // Just so we dont mess up the master ledger in case people are testing locally
  ),
};
