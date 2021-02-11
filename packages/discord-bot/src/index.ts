// Use the Client that are provided by @typeit/discord NOT discord.js
import { Client } from '@typeit/discord';

import { CONFIG } from './config';
import * as types from './types';

async function start() {
  const client = new Client({
    classes: [
      `${__dirname}/*Discord.ts`, // glob string to load the classes
      `${__dirname}/*Discord.js`, // If you compile using "tsc" the file extension change to .js
    ],
    silent: false,
    variablesChar: ':',
  });

  await client.login(CONFIG.discordBotToken);
}

start();


export { types };
