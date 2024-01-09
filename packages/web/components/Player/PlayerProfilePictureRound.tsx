import type { AvatarProps } from '@metafam/ds';
import { RoundImage } from 'components/RoundImage';
import type { Player } from 'graphql/autogen/types';
import type { GuildPlayer } from 'graphql/types';
import { useProfileImageOnload } from 'lib/hooks/useProfileImageOnload';
import React from 'react';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePictureRound: React.FC<PlayerProfilePictureProps> = ({
  player,
  src,
  ...props
}) => {
  const imageUrl = useProfileImageOnload({ player });

  return (
    <>
      <RoundImage src={imageUrl as string ?? undefined} {...props} />
    </>
  );
};
