import GuildCoverImageFull from 'assets/guild-background-full.jpeg';
import GuildCoverImageSmall from 'assets/guild-background-small.jpeg';
import PlayerCoverImageFull from 'assets/player-background-full.jpg';
import PlayerCoverImageSmall from 'assets/player-background-small.jpg';
import { ethers } from 'ethers';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { httpLink } from 'utils/linkHelpers';

export const getPlayerImage = (player: PlayerFragmentFragment): string =>
  httpLink(player.profile_cache?.imageURL) ||
  `https://avatars.dicebear.com/api/jdenticon/${player.username}.svg`;

export const getPlayerCoverImage = (player: PlayerFragmentFragment): string =>
  httpLink(player.profile_cache?.backgroundImageURL) || PlayerCoverImageSmall;

export const getPlayerCoverImageFull = (
  player: PlayerFragmentFragment,
): string =>
  httpLink(player.profile_cache?.backgroundImageURL) || PlayerCoverImageFull;

export const getGuildCoverImageFull = (): string => GuildCoverImageFull;

export const getGuildCoverImageSmall = (): string => GuildCoverImageSmall;

export const getPlayerName = (player: PlayerFragmentFragment): string =>
  player.profile_cache?.name || formatUsernameIfAddress(player.username);

export const getPlayerDescription = (player: PlayerFragmentFragment): string =>
  player.profile_cache?.description || '';

export const formatAddress = (address = ''): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;

export const formatUsernameIfAddress = (username = ''): string =>
  ethers.utils.isAddress(username) ? formatAddress(username) : username;

export const hasPlayerImage = (player: PlayerFragmentFragment): boolean =>
  !!player.profile_cache?.imageURL;
