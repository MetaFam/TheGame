import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  graphqlURL: string;
  frontendURL: string;
  hasuraAdminURL: string;
  daoHausGraphqlURL: string;
  daoHausPolygonGraphqlURL: string;
  daoHausXdaiGraphqlURL: string;
  daoHausMetadataUrl: string;
  seedGraphqlURL: string;
  githubApiToken: string;
  adminKey: string;
  infuraId: string;
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
  frontendURL: parseEnv(process.env.FRONTEND_URL, 'http://localhost:3000'),
  hasuraAdminURL: parseEnv(
    process.env.HASURA_ADMIN_URL,
    'https://api.metagame.wtf/console',
  ),
  daoHausGraphqlURL: parseEnv(
    process.env.DAOHAUS_GRAPHQL_URL,
    `https://gateway.thegraph.com/api/${process.env.THE_GRAPH_API_TOKEN}/subgraphs/id/9uvKq57ZiNCdT9uZ6xaFhp3yYczTM4Fgr7CJHM6tdX9H`,
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
  // See https://thegraph.com/hosted-service/subgraph/tenfinney/polygon-seeds
  seedGraphqlURL: parseEnv(
    process.env.SEED_GRAPHQL_URL,
    'https://api.thegraph.com/subgraphs/name/tenfinney/polygon-seeds',
  ),
  githubApiToken: parseEnv(process.env.GITHUB_API_TOKEN, ''),
  adminKey: parseEnv(
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    'metagame_secret',
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
