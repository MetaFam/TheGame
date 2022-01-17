import { Maybe } from '@metafam/utils';
import ProfileIcon from 'assets/generic-user-icon.svg';
import GuildCoverImageFull from 'assets/guild-background-full.jpeg';
import GuildCoverImageSmall from 'assets/guild-background-small.jpeg';
import PlayerCoverImageFull from 'assets/player-background-full.jpg';
import PlayerCoverImageSmall from 'assets/player-background-small.jpg';
import { ethers } from 'ethers';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { httpLink } from 'utils/linkHelpers';

export const getPlayerImage = (
  player?: PlayerFragmentFragment | GuildPlayer,
): string => {
  const link = httpLink(player?.profile?.profileImageURL);
  if (link) return link;

  const { ethereumAddress } = player ?? {};
  return ethereumAddress
    ? `https://avatars.dicebear.com/api/jdenticon/${ethereumAddress}.svg`
    : ProfileIcon;
};

export const getPlayerBanner = (player: PlayerFragmentFragment): string =>
  httpLink(player.profile?.bannerImageURL) || PlayerCoverImageSmall;

export const getPlayerBannerFull = (player?: PlayerFragmentFragment): string =>
  httpLink(player?.profile?.bannerImageURL) || PlayerCoverImageFull;

export const getGuildCoverImageFull = (): string => GuildCoverImageFull;

export const getGuildCoverImageSmall = (): string => GuildCoverImageSmall;

export const getPlayerName = (
  player?: PlayerFragmentFragment | GuildPlayer,
): string | undefined =>
  player?.profile?.name ||
  player?.profile?.username ||
  formatAddress(player?.ethereumAddress);

export const getPlayerUsername = (
  player?: PlayerFragmentFragment,
): string | undefined =>
  formatIfAddress(player?.profile?.username ?? undefined);

export const getPlayerDescription = (
  player?: PlayerFragmentFragment,
): string | undefined => player?.profile?.description ?? undefined;

export const formatAddress = (address = ''): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;

export const formatIfAddress = (username = ''): string =>
  ethers.utils.isAddress(username) ? formatAddress(username) : username;

export const getPlayerURL = (
  player?: PlayerFragmentFragment | GuildPlayer,
  opts?: { rel: boolean },
): string | undefined => {
  let { username } = player?.profile ?? {};
  username ??= player?.ethereumAddress;
  const { rel = true } = opts ?? {};
  if (username) {
    const path = `/player/${username}`;
    return `${rel ? '' : 'https://my.metagame.wtf'}${path}`;
  }
  return undefined;
};

export const hasImage = (
  player?: PlayerFragmentFragment | GuildPlayer,
): boolean => !!player?.profile?.profileImageURL;

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
