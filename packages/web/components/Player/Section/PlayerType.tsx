import { Text } from '@metafam/ds';
import { Player_Type, PlayerFragmentFragment } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
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
  const { user } = useUser();

  // there has to be a prettier way to write this
  const type = isOwnProfile && user?.player ? user?.player.type : player.type;

  return (
    <ProfileSection
      title="Player type"
      onRemoveClick={onRemoveClick}
      isOwnProfile={isOwnProfile}
      boxType={BOX_TYPE.PLAYER_TYPE}
    >
      {type?.title && (
        <FlexContainer align="stretch">
          <Text
            color="white"
            fontWeight="600"
            casing="uppercase"
            fontSize={{ base: 'md', sm: 'lg' }}
          >
            {type.title}
          </Text>
          <Text fontSize={{ base: 'sm', sm: 'md' }} color="blueLight">
            {type.description}
          </Text>
        </FlexContainer>
      )}
    </ProfileSection>
  );
};
