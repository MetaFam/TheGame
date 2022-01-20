import dotenv from 'dotenv';
import * as Path from 'path';

dotenv.config({ path: Path.join(__dirname, '../.env') });

interface IConfig {
  port: number;
  graphqlURL: string;
  adminKey: string;
  frontendUrl: string;
  githubApiToken: string;
  discordBotToken: string;
  discordBotClientSecret: string;
  sourceCredLedgerBranch: string;
  discordApiBaseUrl: string;
  discourseInstanceUrl: string;
  botName: string;
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
  port: parseEnv(process.env.PORT, 5000),
  graphqlURL: (() => {
    const { GRAPHQL_URL: url, GRAPHQL_HOST: host } = process.env;

    if (url) return url;
    if (host) {
      return `https://${host}.onrender.com/v1/graphql`;
    }
    return 'http://localhost:8080/v1/graphql';
  })(),
  adminKey: parseEnv(
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    'metagame_secret',
  ),
  frontendUrl: parseEnv(process.env.FRONTEND_URL, 'http://localhost:3000'),
  githubApiToken: parseEnv(process.env.GITHUB_API_TOKEN, ''),
  discordBotToken: parseEnv(process.env.DISCORD_BOT_TOKEN, ''),
  discordBotClientSecret: parseEnv(process.env.DISCORD_BOT_CLIENT_SECRET, ''),
  sourceCredLedgerBranch: parseEnv(
    process.env.SOURCECRED_LEDGER_BRANCH,
    'staging', // Just so we dont mess up the master ledger in case people are testing locally
  ),
  discordApiBaseUrl: parseEnv(
    process.env.DISCORD_API_BASE_URL,
    'https://discord.com/api/v8',
  ),
  discourseInstanceUrl: parseEnv(
    process.env.DISCOURSE_INSTANCE_URL,
    'https://forum.metagame.wtf',
  ),
  botName: 'MetaGameBot',
};
