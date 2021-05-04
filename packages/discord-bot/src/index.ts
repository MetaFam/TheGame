// Use the Client that are provided by @typeit/discord NOT discord.js
import { Client } from '@typeit/discord';

import { CONFIG } from './config';

async function createDiscordClient(): Promise<Client> {
  const client = new Client({
    classes: [
      // We are using tsc, so we want to load the compiled files
      `${__dirname}/discord/**/*.js`, // glob string to load the classes
    ],
    silent: false,
    variablesChar: ':',
  });

  await client.login(CONFIG.discordBotToken);

  return client;
}

export { createDiscordClient };
export * from './auth';
export * from './types';
