import { Player } from 'graphql/autogen/types';
import { GuildPlayer } from 'graphql/types';
import React, { useEffect,useMemo, useState } from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

export const useProfileImageOnload: React.FC<{ player: Player | GuildPlayer | undefined }> = ({ player }): string => {
  const avatarImg = useMemo(() => getPlayerImage(player), [player]);
  
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
  }, [profileImage]);

  return imageURL
}
