import type { AvatarProps } from '@metafam/ds';
import { SquareImage } from 'components/SquareImage';
import type { Player } from 'graphql/autogen/types';
import type { GuildPlayer } from 'graphql/types';
import React, { useMemo, useState, useEffect } from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePicture: React.FC<PlayerProfilePictureProps> = ({
  player,
  src,
  ...props
}) => {
  const avatarImg = useMemo(() => getPlayerImage(player), [player, src]);
  
  const [imageURL, setImageURL] = useState(avatarImg.profileIcon);
  const profileImage = avatarImg.link;

  useEffect(() => {
    if (!profileImage) return;
    const image = new Image();
    image.src = profileImage;

    image.onload = () => {
      setImageURL(profileImage);
    };

    image.onerror = () => {
      console.error('Original image failed to load.');
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [profileImage]);

  return (
    <>
      <SquareImage src={imageURL} {...props} />
    </>
  );
};
