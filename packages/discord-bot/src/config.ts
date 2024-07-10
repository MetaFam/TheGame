import dotenv from 'dotenv';

dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

interface IConfig {
  port: number;
  graphqlURL: string;
  adminKey: string;
  frontendURL: string;
  githubAPIToken: string;
  botName: string;
  botGuild: string;
  botToken: string;
  botSecret: string;
  feedbackChannel: string;
  apiBaseURL: string;
  inDocker: boolean;
}

function parseEnv<T extends string | number>(
  name: string,
  opts?: { defaultValue?: T, error?: boolean },
): T
function parseEnv<T extends string | number>(
  name: string,
  opts?: { defaultValue?: T, error?: boolean },
): string | number | undefined {
  const val = process.env[name]
  if(val == null) {
    if(opts?.error) {
      throw new Error(`Missing environment variable: "${name}".`);
    }
    return opts?.defaultValue;
  }

  if(typeof opts?.defaultValue === 'number') {
    return Number(val);
  }
  return val;
}

export const CONFIG: IConfig = {
  port: parseEnv('PORT', { defaultValue: 5000 }),
  graphqlURL: (() => {
    const { GRAPHQL_URL: url, GRAPHQL_HOST: host } = process.env;
  
    if (url) return url;
    if (host) {
      return `https://${host}.onrender.com/v1/graphql`;
    }
    return 'http://localhost:8080/v1/graphql';
  })(),
  adminKey: parseEnv(
    'HASURA_GRAPHQL_ADMIN_SECRET',
  ),
  frontendURL: parseEnv('FRONTEND_URL', { defaultValue: 'http://localhost:3000' }),
  githubAPIToken: parseEnv('GITHUB_API_TOKEN'),
  botToken: parseEnv('DISCORD_BOT_TOKEN', { error: true }),
  botSecret: parseEnv('DISCORD_BOT_CLIENT_SECRET', { error: true }),
  apiBaseURL: parseEnv(
    'DISCORD_API_BASE_URL',
    { defaultValue: 'https://discord.com/api/v10' },
  ),
  botName: 'MetaGame’s Bot',
  inDocker: process.env.RUNTIME_ENV === 'docker',
  botGuild: parseEnv('BOT_GUILD', { defaultValue: '808834438196494387' }),
  feedbackChannel: parseEnv('DISCORD_FEEDBACK_CHANNEL', { defaultValue: '794214722639101992' }),
};
