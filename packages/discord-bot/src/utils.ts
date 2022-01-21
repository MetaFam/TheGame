import { Message, Snowflake } from 'discord.js';

export const getDiscordId = (targetParameter: string): Snowflake => {
  // Parse the targetParameter
  // desktop/web user if starts with <@! and ends with >
  // mobile user if starts with <@ and ends with >
  if (targetParameter.startsWith('<@!') && targetParameter.endsWith('>')) {
    return targetParameter.slice(3, targetParameter.length - 1);
  }

  if (targetParameter.startsWith('<@') && targetParameter.endsWith('>')) {
    return targetParameter.slice(2, targetParameter.length - 1);
  }

  throw new Error('Unexpected argument for targetParameter');
};

export const replyWithUnexpectedError = (
  message: Message,
  error: Error,
): Promise<Message> => {
  let reply = `The octo is sad 😢, as there was an unexpected error: "${error}"`;

  const feedbackChannel = message.guild?.channels?.cache.get(
    '794214722639101992',
  );
  if (feedbackChannel) {
    reply += ` Let us know what happened in ${feedbackChannel.toString()}`;
  }

  return message.reply(reply);
};
