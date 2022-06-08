import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  graphqlURL: string;
  daoHausGraphqlURL: string;
  daoHausPolygonGraphqlURL: string;
  daoHausXdaiGraphqlURL: string;
  daoHausMetadataUrl: string;
  seedGraphqlURL: string;
  githubApiToken: string;
  adminKey: string;
  infuraId: string;
  pSEEDAddress: string;
  brightIdAppURL: string;
  sourceCredLedgerBranch: string;
  ceramicURL: string;
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
  nodeEnv: parseEnv(process.env.NODE_ENV, 'local'),
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
    'https://api.thegraph.com/subgraphs/name/tenfinney/polygon-seeds',
  ),
  daoHausGraphqlURL: parseEnv(
    process.env.DAOHAUS_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus',
  ),
  daoHausPolygonGraphqlURL: parseEnv(
    process.env.DAOHAUS_POLYGON_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-matic',
  ),
  daoHausXdaiGraphqlURL: parseEnv(
    process.env.DAOHAUS_XDAI_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
  ),
  daoHausMetadataUrl: parseEnv(
    process.env.DAOHAUS_METADATA_URL,
    'https://data.daohaus.club/dao',
  ),
  adminKey: parseEnv(
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    'metagame_secret',
  ),
  githubApiToken: parseEnv(process.env.GITHUB_API_TOKEN, ''),
  pSEEDAddress: parseEnv(
    process.env.PSEED_ADDRESS,
    '0x8a8fcd351ed553fc75aecbc566a32f94471f302e',
  ),
  infuraId: parseEnv(
    process.env.NEXT_PUBLIC_INFURA_ID,
    '8db5dad32a3f490dac7aaf6cb2b23b82',
  ),
  brightIdAppURL: parseEnv(
    process.env.NEXT_BRIGHTID_APP_URL,
    'https://app.brightid.org',
  ),
  sourceCredLedgerBranch: parseEnv(
    process.env.SOURCECRED_LEDGER_BRANCH,
    'staging', // Just so we dont mess up the master ledger in case people are testing locally
  ),
  ceramicURL: parseEnv(
    process.env.CERAMIC_URL,
    'https://ceramic.metagame.wtf' ||
      'https://d12-a-ceramic.3boxlabs.com' ||
      'http://localhost:7007',
  ),
};
