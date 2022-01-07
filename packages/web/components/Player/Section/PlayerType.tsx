import { Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player_Type, PlayerFragmentFragment } from 'graphql/autogen/types';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useState } from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  onRemoveClick?: () => void;
};

export const PlayerType: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
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
      canEdit={canEdit}
      boxType={BoxType.PLAYER_TYPE}
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
