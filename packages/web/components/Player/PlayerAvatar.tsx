import { Avatar, AvatarProps, useToast } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import { useProfileField } from 'lib/hooks';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import React from 'react';
import { getPlayerImage, hasImage } from 'utils/playerHelpers';

type PlayerAvatarProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerAvatar: React.FC<PlayerAvatarProps> = React.forwardRef<
  HTMLSpanElement,
  PlayerAvatarProps
>(({ player: user, src, ...props }, ref) => {
  const player = user as Player;
  const name = usePlayerName(player);
  const { value: image } = useProfileField({
    field: 'profileImageURL',
    player,
    getter: getPlayerImage,
  });

  const toast = useToast();

  const attrs = {
    src: src ?? image ?? undefined,
    name: name ?? undefined,
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
