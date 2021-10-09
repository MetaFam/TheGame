import { Text } from '@metafam/ds';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { Player_Type, PlayerFragmentFragment } from 'graphql/autogen/types';
import React, { useState } from 'react';

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
}) => {
  const [playerType, setPlayerType] = useState<Player_Type>();

  if (player.type && !playerType) {
    setPlayerType(player.type);
  }

  return (
    <ProfileSection
      title="Player type"
      onRemoveClick={onRemoveClick}
      displayEditButton={displayEditButton}
      EditModal={
        <SetupPlayerType
          playerType={playerType}
          setPlayerType={setPlayerType}
        />
      }
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
};
