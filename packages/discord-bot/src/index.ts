import { Client, GatewayIntentBits } from 'discord.js';

import { CONFIG } from './config.js';

export const createDiscordClient = async () => {
  if (!CONFIG.botToken) {
    throw new Error('`$DISCORD_BOT_TOKEN` not set.');
  }

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  });
  await client.login(CONFIG.botToken);
  return client;
};

export * from './auth.js';
export * from './types.js';
