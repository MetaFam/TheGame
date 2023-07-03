import type { AvatarProps } from '@metafam/ds';
import { RoundImage } from 'components/RoundImage';
import type { Player } from 'graphql/autogen/types';
import type { GuildPlayer } from 'graphql/types';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePictureRound: React.FC<PlayerProfilePictureProps> = ({
  player: user,
  src: source,
  ...props
}) => {
  const player = user as Player;
  const { value: image } = useProfileField({
    field: 'profileImageURL',
    player,
    getter: getPlayerImage,
  });

  const src = source ?? image ?? undefined;

  return (
    <>
      <RoundImage {...{ src, ...props }} />
    </>
  );
};
