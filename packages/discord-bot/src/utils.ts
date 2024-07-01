import { Message, Snowflake } from 'discord.js';

import { CONFIG } from './config';

export const getDiscordId = (targetParameter: string): Snowflake => {
  // desktop/web user if starts with <@! and ends with >
  // mobile user if starts with <@ and ends with >
  if (targetParameter.startsWith('<@!') && targetParameter.endsWith('>')) {
    return targetParameter.slice(3, targetParameter.length - 1);
  }

  if (targetParameter.startsWith('<@') && targetParameter.endsWith('>')) {
    return targetParameter.slice(2, targetParameter.length - 1);
  }

  throw new Error(`Unexpected argument for \`targetParameter\`: “${targetParameter}”.`);
};

export const replyWithUnexpectedError = (
  message: Message,
): Promise<Message> => {
  let reply = `The octo is sad 😢, as there was an unexpected error.`;

  const feedbackChannel = (
    message.guild?.channels?.cache.get(CONFIG.feedbackChannel)
  );
  if(feedbackChannel) {
    reply += `\n\nLet us know what happened in ${feedbackChannel.toString()}.`;
  }

  return message.reply(reply);
};
