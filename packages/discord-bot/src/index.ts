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
    intents: [Intents.FLAGS.GUILD_MEMBERS],
    silent: false,
    simpleCommand: {
      prefix: '!mg',
      responses: {
        notFound: (command: Message<boolean>) => {
          command.reply(`${CONFIG.botName} doesn't recognize that command.`);
        },
      },
    },
  });

  client.once('ready', async () => {
    // make sure all guilds are in cache
    await client.guilds.fetch();

    // init all application commands
    await client.initApplicationCommands({
      guild: { log: true },
      global: { log: true },
    });

    // init permissions; enabled log to see changes
    await client.initApplicationPermissions(true);

    // uncomment this line to clear all guild commands,
    // useful when moving to global commands from guild commands
    //  await client.clearApplicationCommands(
    //    ...client.guilds.cache.map((g) => g.id)
    //  );
  });

  await client.login(CONFIG.discordBotToken);
  return client;
}

export { createDiscordClient };
export * from './auth';
export * from './types';
