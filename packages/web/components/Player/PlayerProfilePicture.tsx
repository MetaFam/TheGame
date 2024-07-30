import type { AvatarProps } from '@metafam/ds';

import { SquareImage } from '#components/SquareImage';
import type { Player } from '#graphql/autogen/hasura-sdk';
import type { GuildPlayer } from '#graphql/types';
import { useProfileImageOnload } from '#lib/hooks/useProfileImageOnload';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePicture: React.FC<PlayerProfilePictureProps> = ({
  player,
  src,
  ...props
}) => {
  const imageURL = useProfileImageOnload({ player });

  return (
    <>
      <SquareImage src={imageURL} {...props} />
    </>
  );
};
