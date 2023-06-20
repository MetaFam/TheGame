import type { AvatarProps } from '@metafam/ds';
import { RoundImage } from 'components/RoundImage';
import { SquareImage } from 'components/SquareImage';
import type { Player } from 'graphql/autogen/types';
import type { GuildPlayer } from 'graphql/types';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
  round?: boolean;
};

export const PlayerProfilePicture: React.FC<PlayerProfilePictureProps> = ({
  player: user,
  src: source,
  round = false,
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
      {round && <RoundImage {...{ src, ...props }} />}
      {!round && <SquareImage {...{ src, ...props }} />}
    </>
  );
};
