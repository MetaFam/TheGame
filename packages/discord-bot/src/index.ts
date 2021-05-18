// Use the Client that are provided by @typeit/discord NOT discord.js
import { Client } from '@typeit/discord';

import { CONFIG } from './config';

// Within a docker container: We are using tsc, so we want to load the compiled files.
// For local dev, we are transpiling: Load the .ts files.
const glob = process.env.RUNTIME_ENV === 'docker' ?
  `${__dirname}/discord/**/*.js` :
  `${__dirname}/discord/**/*.ts` 

async function createDiscordClient(): Promise<Client> {
  const client = new Client({
    classes: [glob],
    silent: false,
    variablesChar: ':',
  });

  await client.login(CONFIG.discordBotToken);
  return client;
}

export { createDiscordClient };
export * from './auth';
export * from './types';
