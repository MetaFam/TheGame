import  { environment } from '../environment';

module.exports = function parseWhitelistedChannels() {
  const channels = environment('WHITELISTED_CHANNELS');
  if (!channels) {
    return ['*'];
  }

  return channels.split(',');
};
