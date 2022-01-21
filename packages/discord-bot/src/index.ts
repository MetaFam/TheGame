import { Client, Intents } from 'discord.js';

import { CONFIG } from './config';

async function createDiscordClient(): Promise<Client> {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
  });

  await client.login(CONFIG.discordBotToken);
  return client;
}

export { createDiscordClient };
export * from './auth';
export * from './types';
