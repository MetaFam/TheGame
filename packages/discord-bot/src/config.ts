// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `${__dirname}/../.env` });

interface IConfig {
  graphqlURL: string;
  adminKey: string;
  discordBotToken: string;
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
  graphqlURL: parseEnv(
    process.env.GRAPHQL_URL,
    'http://localhost:8080/v1/graphql',
  ),
  adminKey: parseEnv(
    process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    'metagame_secret',
  ),
  discordBotToken: parseEnv(process.env.DISCORD_BOT_TOKEN, ''),
};
