import { Avatar, AvatarProps } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { getPlayerImage, getPlayerName, hasImage } from 'utils/playerHelpers';

type PlayerAvatarProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = React.forwardRef<
  HTMLSpanElement,
  PlayerAvatarProps
>(({ player: user, src, ...props }, ref) => {
  const player = user as Player;
  const { value: image } = useProfileField({
    field: 'profileImageURL',
    player,
    getter: getPlayerImage,
  });
  const { name } = useProfileField({
    field: 'name',
    player,
    getter: getPlayerName,
  });
  const attrs = {
    src: src ?? image ?? undefined,
    name: name ?? undefined,
    color: 'white',
    ...props,
  };

  if (src || hasImage(player)) {
    attrs.bg = 'transparent';
  }

  return <Avatar {...attrs} {...{ ref }} />;
});
