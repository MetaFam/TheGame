import type { AvatarProps } from '@metafam/ds';

import { RoundImage } from '#components/RoundImage';
import type { Player } from '#graphql/autogen/hasura-sdk';
import type { GuildPlayer } from '#graphql/types';
import { useProfileImageOnload } from '#lib/hooks/useProfileImageOnload';

type PlayerProfilePictureProps = AvatarProps & {
  player?: Player | GuildPlayer;
};

export const PlayerProfilePictureRound: React.FC<PlayerProfilePictureProps> = ({
  player,
  src,
  ...props
}) => {
  const imageURL = useProfileImageOnload({ player });

  return (
    <>
      <RoundImage src={imageURL} {...props} />
    </>
  );
};
