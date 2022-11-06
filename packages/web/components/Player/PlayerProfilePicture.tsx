<<<<<<< HEAD
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
=======
import { AvatarProps, Image } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { getPlayerImage, getPlayerName, hasImage } from 'utils/playerHelpers';
>>>>>>> 1e938dce (redesign of the cards #1)

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

<<<<<<< HEAD
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
=======
export const PlayerProfilePicture: React.FC<PlayerProfilePictureProps> =
  React.forwardRef<HTMLSpanElement, PlayerProfilePictureProps>(
    ({ player: user, src, ...props }) => {
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
        marginTop: '0 !important',
        ...props,
      };

      if (src || hasImage(player)) {
        attrs.bg = 'transparent';
      }

      return <Image {...attrs} />;
    },
  );
>>>>>>> 1e938dce (redesign of the cards #1)
