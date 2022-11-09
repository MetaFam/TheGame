import { AvatarProps, Image } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { getPlayerImage, getPlayerName, hasImage } from 'utils/playerHelpers';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePicture: React.FC<PlayerProfilePictureProps> = ({
  player: user,
  src,
  ...props
}) => {
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
    borderTopRadius: 10,
    margin: '0 !important',
    width: '100%',
    // height: '100%',
    ...props,
  };

  if (src || hasImage(player)) {
    attrs.bg = 'transparent';
  }

  return <Image {...attrs} />;
};
