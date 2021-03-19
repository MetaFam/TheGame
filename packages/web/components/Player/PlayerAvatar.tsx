import { Avatar, AvatarProps } from '@metafam/ds';
import React from 'react';

import { PlayerFragmentFragment } from '../../graphql/autogen/types';
import {
  getPlayerImage,
  getPlayerName,
  hasPlayerImage,
} from '../../utils/playerHelpers';

type Props = { player: PlayerFragmentFragment; page: string };
export const PlayerAvatar: React.FC<Props> = ({ player, page }) => {
  let avatarProps: AvatarProps = {};
  if (page === 'list')
    avatarProps = {
      size: 'xl',
      src: getPlayerImage(player),
      name: getPlayerName(player),
    };
  if (page === 'detail')
    avatarProps = {
      w: { base: '32', md: '56' },
      h: { base: '32', md: '56' },
      src: getPlayerImage(player),
      name: getPlayerName(player),
    };
  if (hasPlayerImage(player)) avatarProps.bg = 'transparent';
  return <Avatar {...avatarProps} />;
};
