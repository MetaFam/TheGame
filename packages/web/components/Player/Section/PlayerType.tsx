import { Text } from '@metafam/ds';
import { Player_Type, PlayerFragmentFragment } from 'graphql/autogen/types';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useState } from 'react';
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
  const updateFN = () => setPlayerType(player.type);

  const { animation } = useAnimateProfileChanges(player.type, updateFN);

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
