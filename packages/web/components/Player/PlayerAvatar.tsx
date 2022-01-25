import { Avatar, AvatarProps } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import React from 'react';
import { getPlayerImage, getPlayerName, hasImage } from 'utils/playerHelpers';

type PlayerAvatarProps = AvatarProps & {
  player?: Player | GuildPlayer;
  omitBackground?: boolean;
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = React.forwardRef<
  HTMLSpanElement,
  PlayerAvatarProps
>(({ player, src, ...props }, ref) => {
  const attrs = {
    src: src ?? getPlayerImage(player),
    name: getPlayerName(player),
    ...props,
  };

  if (src || hasImage(player)) {
    attrs.bg = 'transparent';
  }

  return <Avatar {...attrs} {...{ ref }} />;
});
