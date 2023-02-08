import { isAddress } from '@ethersproject/address';
import { Maybe } from '@metafam/utils';
import ProfileIcon from 'assets/generic-user-icon.svg';
import GuildCoverImageFull from 'assets/guild-background-full.jpeg';
import GuildCoverImageSmall from 'assets/guild-background-small.jpeg';
import PlayerCoverImageSmall from 'assets/player-background-small.jpg';
import { AccountType_Enum, Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { getENSForAddress } from './ensHelpers';
import { optimizedImage } from './imageHelpers';

export const getPlayerImage = (
  player?: Maybe<Player | GuildPlayer>,
): string => {
  const key = 'profileImageURL';
  const link = optimizedImage(key, player?.profile?.[key]);

  if (link) return link;

  const { ethereumAddress } = player ?? {};
  return ethereumAddress
    ? `https://avatars.dicebear.com/api/jdenticon/${ethereumAddress}.svg`
    : ProfileIcon.src;
};

export const getPlayerBanner = (player: Maybe<Player>): string => {
  const key = 'bannerImageURL';
  return (
    optimizedImage(key, player?.profile?.[key], { height: 100 }) ??
    PlayerCoverImageSmall.src
  );
};

export const getPlayerBannerFull = (player?: Maybe<Player>): string => {
  const key = 'bannerImageURL';
  return optimizedImage(key, player?.profile?.[key]) || '';
};

export const getPlayerBackgroundFull = (player?: Maybe<Player>): string => {
  const key = 'backgroundImageURL';
  return optimizedImage(key, player?.profile?.[key]) || '';
};

export const getGuildCoverImageFull = (): string => GuildCoverImageFull.src;

export const getGuildCoverImageSmall = (): string => GuildCoverImageSmall.src;

export const getPlayerName = (
  player?: Maybe<Player | GuildPlayer>,
): string | undefined =>
  player?.profile?.name ||
  formatIfAddress(player?.profile?.username ?? undefined) ||
  formatAddress(player?.ethereumAddress);

export const getPlayerUsername = (player?: Maybe<Player>): string | undefined =>
  formatIfAddress(player?.profile?.username ?? undefined);

export const getPlayerDescription = (
  player?: Maybe<Player>,
): string | undefined => player?.profile?.description ?? undefined;

export const getPlayerMeetwithWalletCalendarUrl = (
  player?: Maybe<Player>,
): string | undefined =>
  player?.accounts?.find((acc) => acc.type === AccountType_Enum.Meetwithwallet)
    ?.identifier || undefined;

export const formatAddress = (address = ''): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;

export const formatIfAddress = (username = ''): string =>
  isAddress(username) ? formatAddress(username) : username;

  export const getPlayerURL = async (
    player?: Maybe<Player | GuildPlayer>,
    opts: { rel?: boolean; default?: string } = {},
  ) => {
    let { username } = player?.profile ?? {};
    username ??= await getNameFromAddress(player?.ethereumAddress);
    username ??= player?.ethereumAddress;
    const { rel: relative = true } = opts;
    if (username) {
      const path = `/player/${username}`;
      return `${relative ? '' : 'https://my.metagame.wtf'}${path}`;
    }
    return opts.default;
  };

export const hasImage = (player?: Maybe<Player | GuildPlayer>): boolean =>
  !!player?.profile?.profileImageURL;

export const dispositionFor = (mask?: Maybe<number>) => {
  if (mask == null) return null;

  let disposition = '';
  if ((mask & 0b10000) > 0) disposition += 'W';
  if ((mask & 0b01000) > 0) disposition += 'U';
  if ((mask & 0b00100) > 0) disposition += 'B';
  if ((mask & 0b00010) > 0) disposition += 'R';
  if ((mask & 0b00001) > 0) disposition += 'G';
  return disposition;
};
