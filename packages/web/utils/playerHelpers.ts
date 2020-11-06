import BackgroundImage from 'assets/tile-background.jpg';

import { PlayerFragmentFragment } from '../graphql/autogen/types';

export const getPlayerImage = (player: PlayerFragmentFragment): string =>
  player.box_profile?.imageUrl ||
  `https://avatars.dicebear.com/api/jdenticon/${player.username}.svg`;

export const getPlayerCoverImage = (player: PlayerFragmentFragment): string =>
  player.box_profile?.coverImageUrl || BackgroundImage;

export const getPlayerName = (player: PlayerFragmentFragment): string =>
  player.box_profile?.name || player.username;

export const getPlayerDescription = (player: PlayerFragmentFragment): string =>
  player.box_profile?.description || '';
