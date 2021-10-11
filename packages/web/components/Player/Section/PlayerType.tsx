import { Text } from '@metafam/ds';
import { Player_Type, PlayerFragmentFragment } from 'graphql/autogen/types';
import React, { useEffect, useRef, useState } from 'react';
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
  const [playerType, setPlayerType] = useState<Player_Type | null>();
  const [animation, setAnimation] = useState<string>('fadeIn');

  const type = player?.type;

  const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const previousType = usePrevious(type);

  // todo refactor so that usePrevious won't be needed anymore
  // something is retriggering useEffect when color disposition is changed, for example
  // i suspect the type object's reference is changing
  useEffect(() => {
    if (previousType?.title !== type?.title) {
      setAnimation('fadeOut');
      setTimeout(() => {
        setPlayerType(type);
        setAnimation('fadeIn');
      }, 400);
    }
  }, [type, previousType]);

  return (
    <ProfileSection
      title="Player type"
      onRemoveClick={onRemoveClick}
      isOwnProfile={isOwnProfile}
      boxType={BOX_TYPE.PLAYER_TYPE}
    >
      {playerType && (
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
            {playerType.title}
          </Text>
          <Text fontSize={{ base: 'sm', sm: 'md' }} color="blueLight">
            {playerType.description}
          </Text>
        </FlexContainer>
      )}
    </ProfileSection>
  );
};
