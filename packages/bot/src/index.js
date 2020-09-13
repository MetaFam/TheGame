import * as Sentry from '@sentry/node';
import * as Discord from 'discord.js';
import dotenv from 'dotenv';

import { environment } from './environment';
import { RequestHandlerError, WhitelistedChannelError } from './error-utils';
import detectHandler from './parser/detectHandler';
import parseWhitelistedChannels from './parser/whitelistedChannels';
import { error, log } from './utils';

// Load this as early as possible, to init all the environment variables that may be needed
dotenv.config();
Sentry.init({ dsn: environment('SENTRY_DSN') });

const client = new Discord.Client();

client.on('ready', () => {
  log(`Bot successfully started as ${client.user.tag} 🦅`);
});

client.on('message', (message) => {
  if (message.author.bot) {
    return;
  }
  try {
    const whitelistedChannels = parseWhitelistedChannels();

    const messageWhitelisted = whitelistedChannels.reduce(
      (whitelisted, channel) =>
        channel === message.channel.name || channel === '*' || whitelisted,
      false,
    );

    if (!messageWhitelisted && whitelistedChannels) {
      return;
    }

    const handler = detectHandler(message.content);
    handler(message);
    log(
      `Served command ${message.content} successfully for ${message.author.username}`,
    );
  } catch (err) {
    if (err instanceof RequestHandlerError) {
      message.reply(
        'Could not find the requested command. Please use !ac help for more info.',
      );
    } else if (err instanceof WhitelistedChannelError) {
      error('FATAL: No whitelisted channels set in the environment variables.');
    }
    Sentry.captureException(err);
  }
});

client.login(process.env.DISCORD_API_TOKEN);
