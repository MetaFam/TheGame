import type { AvatarProps } from '@metafam/ds';
import { SquareImage } from 'components/SquareImage';
import type { Player } from 'graphql/autogen/types';
import type { GuildPlayer } from 'graphql/types';
import React, { useMemo } from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePicture: React.FC<PlayerProfilePictureProps> = ({
  player,
  src,
  ...props
}) => {
  const avatarImg = useMemo(() => src ?? getPlayerImage(player), [player, src]);

  return (
    <>
      <SquareImage src={avatarImg ?? undefined} {...props} />
    </>
  );
};
