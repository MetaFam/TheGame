import { Avatar, AvatarProps, useToast } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import { useProfileImageOnload } from 'lib/hooks/useProfileImageOnload';
import React, { useMemo } from 'react';
import { getPlayerImage, hasImage } from 'utils/playerHelpers';

type PlayerAvatarProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = React.forwardRef<
  HTMLSpanElement,
  PlayerAvatarProps
>(({ player: user, src, ...props }, ref) => {
  const player = user as Player;
  const toast = useToast();

  const attrs = {
    src: useProfileImageOnload({ player }),
    name: usePlayerName(player),
    color: 'white',
    ...props,
  };

  if (src || hasImage(player)) {
    attrs.bg = 'transparent';
  }

  return (
    <Avatar
      title={`ETH Address: ${player.ethereumAddress}`}
      onClick={() => {
        navigator.clipboard.writeText(player.ethereumAddress);
        toast({
          title: 'Copied to Clipboard',
          description: player.ethereumAddress,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }}
      {...{ ref, ...attrs }}
    />
  );
});
