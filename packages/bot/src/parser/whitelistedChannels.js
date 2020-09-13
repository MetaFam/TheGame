import { environment } from '../environment';

export function parseWhitelistedChannels() {
  const channels = environment('WHITELISTED_CHANNELS');
  if (!channels) {
    return ['*'];
  }

  return channels.split(',');
};
