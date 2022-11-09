<<<<<<< HEAD
import type { AvatarProps } from '@metafam/ds';
import { SquareImage } from 'components/SquareImage';
import type { Player } from 'graphql/autogen/types';
import type { GuildPlayer } from 'graphql/types';
=======
import { AvatarProps } from '@metafam/ds';
import { SquareImage } from 'components/SquareImage';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
>>>>>>> 86629af0 (make all card images square & clickable)
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePicture: React.FC<PlayerProfilePictureProps> = ({
  player: user,
  src,
}) => {
  const player = user as Player;
  const { value: image } = useProfileField({
    field: 'profileImageURL',
    player,
    getter: getPlayerImage,
  });

  const pic = src ?? image ?? undefined;

<<<<<<< HEAD
  return <SquareImage src={pic}/>;
=======
  return <SquareImage src={pic} />;
>>>>>>> 86629af0 (make all card images square & clickable)
};
