import type { AvatarProps } from '@metafam/ds';
import { RoundImage } from 'components/RoundImage';
import type { Player } from 'graphql/autogen/types';
import type { GuildPlayer } from 'graphql/types';
import React, { useMemo } from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePictureRound: React.FC<PlayerProfilePictureProps> = ({
  player,
  src,
  ...props
}) => {
  const avatarImg = useMemo(() => src ?? getPlayerImage(player), [player, src]);

  return (
    <>
      <RoundImage src={avatarImg ?? undefined} {...props} />
    </>
  );
};
