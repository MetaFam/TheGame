import { Avatar, AvatarProps } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import {
  getImageFor,
  getNameOf,
  hasImage,
} from 'utils/playerHelpers';

type PlayerAvatarProps = AvatarProps & {
  player?: PlayerFragmentFragment;
  omitBackground?: boolean;
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = React.forwardRef<
  HTMLSpanElement,
  PlayerAvatarProps
>(({ player, src, ...props }, ref) => {
  const attrs = {
    src: src ?? getImageFor(player),
    name: getNameOf(player),
    ...props,
  };

  if (src || hasImage(player)) {
    attrs.bg = 'transparent';
  }

  return <Avatar {...attrs} {...{ ref }} />;
});