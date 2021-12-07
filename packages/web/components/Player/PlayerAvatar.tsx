import { Avatar, AvatarProps } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import {
  getPlayerImage,
  getPlayerName,
  hasPlayerImage,
} from 'utils/playerHelpers';

type PlayerAvatarProps = AvatarProps & {
  player?: PlayerFragmentFragment;
  omitBackground?: boolean;
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  player,
  omitBackground = true,
  ...props
}) => {
  const attrs = {
    src: getPlayerImage(player),
    name: getPlayerName(player),
    ...props,
  };
  if (omitBackground && hasPlayerImage(player)) {
    attrs.bg = 'transparent';
  }

  return <Avatar {...attrs} />;
};
