import BackgroundImage from 'assets/tile-background.jpg';
import { ethers } from 'ethers';

import { PlayerFragmentFragment } from '../graphql/autogen/types';

export const getPlayerImage = (player: PlayerFragmentFragment): string =>
  player.profile_cache?.imageURL ||
  `https://avatars.dicebear.com/api/jdenticon/${player.username}.svg`;
export const getPlayerCoverImage = (player: PlayerFragmentFragment): string =>
  player.profile_cache?.backgroundImageURL || BackgroundImage;

export const getPlayerName = (player: PlayerFragmentFragment): string =>
  player.profile_cache?.name || formatUsernameIfAddress(player.username);

export const getPlayerDescription = (player: PlayerFragmentFragment): string =>
  player.profile_cache?.description || '';

export const formatAddress = (address = ''): string =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const formatUsernameIfAddress = (username = ''): string =>
  ethers.utils.isAddress(username) ? formatAddress(username) : username;

export const hasPlayerImage = (player: PlayerFragmentFragment): boolean =>
  !!player.profile_cache?.imageURL;
