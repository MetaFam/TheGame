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
      <FlexContainer align="stretch" fontSize={{ base: 'sm', sm: 'md' }}>
        <Text
          color="white"
          // fontWeight="600" 600 === 700 :{ and 700 is too much
          casing="uppercase"
          fontSize={{ base: 'sm', sm: 'md' }}
        >
          {player.type.title}
        </Text>
        <Text color="blueLight">{player.type.description}</Text>
      </FlexContainer>
    )}
  </ProfileSection>
);
