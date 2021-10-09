import { Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { FlexContainer } from '../../Container';
import { ProfileSection } from '../../ProfileSection';

type Props = {
  player: PlayerFragmentFragment;
  displayEditButton: boolean;
  onRemoveClick: () => void;
};
export const PlayerType: React.FC<Props> = ({
  player,
  displayEditButton,
  onRemoveClick,
}) => (
  <ProfileSection
    title="Player type"
    onRemoveClick={onRemoveClick}
    displayEditButton={displayEditButton}
  >
    {player.type?.title && (
      <FlexContainer align="stretch">
        <Text
          color="white"
          fontWeight="600"
          casing="uppercase"
          fontSize={{ base: 'md', sm: 'lg' }}
        >
          {player.type.title}
        </Text>
        <Text fontSize={{ base: 'sm', sm: 'md' }} color="blueLight">
          {player.type.description}
        </Text>
      </FlexContainer>
    )}
  </ProfileSection>
);
