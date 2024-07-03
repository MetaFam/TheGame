import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  graphqlURL: string;
  frontendURL: string;
  theGraphAPIToken?: string;
  hasuraAdminURL: string;
  daoHausGraphURL: string;
  daoHausPolygonGraphURL: string;
  daoHausXDAIGraphURL: string;
  daoHausMetadataURL: string;
  seedGraphURL: string;
  balancerPolygonGraphURL: string;
  githubAPIToken: string;
  adminKey: string;
  infuraId: string;
  brightIdAppURL: string;
  sourceCredLedgerBranch: string;
  ceramicURL: string;
}

function parseEnv<T extends string | number | undefined>(
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
  theGraphAPIToken: parseEnv(process.env.THE_GRAPH_API_TOKEN, undefined),
  hasuraAdminURL: parseEnv(
    process.env.HASURA_ADMIN_URL,
    'https://api.metagame.wtf/console',
  ),
  get daoHausGraphURL() {
    return parseEnv(
      process.env.DAOHAUS_GRAPH_URL,
      `https://gateway.thegraph.com/api/${this.theGraphAPIToken}/subgraphs/id/9uvKq57ZiNCdT9uZ6xaFhp3yYczTM4Fgr7CJHM6tdX9H`,
    );
  },
  daoHausPolygonGraphURL: parseEnv(
    process.env.DAOHAUS_POLYGON_GRAPH_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-matic',
  ),
  daoHausXDAIGraphURL: parseEnv(
    process.env.DAOHAUS_XDAI_GRAPH_URL,
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
  ),
  daoHausMetadataURL: parseEnv(
    process.env.DAOHAUS_METADATA_URL,
    'https://data.daohaus.club/dao',
  ),
  get seedGraphURL() {
    return parseEnv(
      process.env.SEED_GRAPH_URL,
      // 'https://api.studio.thegraph.com/query/42037/metagame-seed-pseed/version/latest',
      `https://gateway-arbitrum.network.thegraph.com/api/${this.theGraphAPIToken}/subgraphs/id/7LxrQZvdYe1NYKen6wuLtCaZqRTL9PhTQHRaHJPYDeCu`,
    );
  },
  get balancerPolygonGraphURL() {
    return parseEnv(
      process.env.BALANCER_POLYGON_GRAPH_URL,
      `https://gateway-arbitrum.network.thegraph.com/api/${this.theGraphAPIToken}/subgraphs/id/H9oPAbXnobBRq1cB3HDmbZ1E8MWQyJYQjT1QDJMrdbNp`,
    );
  },
  githubAPIToken: parseEnv(process.env.GITHUB_API_TOKEN, ''),
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
