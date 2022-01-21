import 'reflect-metadata';

import { importx } from '@discordx/importer';
// Use the Client that is provided by discordx NOT discord.js
import { Intents, Message } from 'discord.js';
import { Client } from 'discordx';

import { CONFIG } from './config';

async function createDiscordClient(): Promise<Client> {
  await importx(
    // Within a docker container: We are using tsc, so we want to load the compiled files.
    // For local dev, we are transpiling: Load the .ts files.
    process.env.RUNTIME_ENV === 'docker'
      ? `${__dirname}/discord/**/*.js`
      : `${__dirname}/discord/**/!(*.d).ts`,
  );

  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES, // required for simple commands it seems
      Intents.FLAGS.GUILD_MEMBERS,
    ],
    silent: false,
    simpleCommand: {
      prefix: '!mg ',
      responses: {
        notFound: (command: Message<boolean>) => {
          command.reply(`${CONFIG.botName} doesn't recognize that command.`);
        },
      },
    },
    botGuilds:
      process.env.RUNTIME_ENV === 'docker' ? undefined : ['808834438196494387'],
  });

  client.once('ready', async () => {
    // make sure all guilds are in cache
    await client.guilds.fetch();
  });

  client.on('messageCreate', (message) => {
    client.executeCommand(message);
  });

  await client.login(CONFIG.discordBotToken);
  return client;
}

export { createDiscordClient };
export * from './auth';
export * from './types';
