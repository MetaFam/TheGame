import { Text } from '@metafam/ds';
import { Player_Type, PlayerFragmentFragment } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { BOX_TYPE } from 'utils/boxTypes';

import { FlexContainer } from '../../Container';
import { ProfileSection } from '../../ProfileSection';

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile: boolean;
  onRemoveClick: () => void;
};

export const PlayerType: React.FC<Props> = ({
  player,
  isOwnProfile,
  onRemoveClick,
}) => {
  const { user } = useUser();
  const [playerType, setPlayerType] = useState<Player_Type | null>();
  const [animation, setAnimation] = useState<string>('fadeIn');

  // there has to be a prettier way to write this
  const type = isOwnProfile && user?.player ? user?.player.type : player.type;

  useEffect(() => {
    setAnimation('fadeOut');
    setTimeout(() => {
      setPlayerType(type);
      setAnimation('fadeIn');
    }, 400);
  }, [type]);

  return (
    <ProfileSection
      title="Player type"
      onRemoveClick={onRemoveClick}
      isOwnProfile={isOwnProfile}
      boxType={BOX_TYPE.PLAYER_TYPE}
    >
      <FlexContainer
        align="stretch"
        transition=" opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        <Text
          color="white"
          fontWeight="600"
          casing="uppercase"
          fontSize={{ base: 'md', sm: 'lg' }}
        >
          {playerType?.title}
        </Text>
        <Text fontSize={{ base: 'sm', sm: 'md' }} color="blueLight">
          {playerType?.description}
        </Text>
      </FlexContainer>
    </ProfileSection>
  );
};
