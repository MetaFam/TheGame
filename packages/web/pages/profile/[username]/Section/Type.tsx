import { Image, Text, Wrap } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { images as BaseImages } from 'graphql/getPersonalityInfo';
import React from 'react';

import { ProfileSection } from '../../../../components/ProfileSection';

type Props = {
  player: PlayerFragmentFragment;
};
const PlayerType: React.FC<Props> = ({ player }) => {
  if (!player.color_aspect) {
    return null;
  }
  const image = BaseImages[player.color_aspect.mask];

  return (
    <ProfileSection title="Player Type">
      <Wrap>
        <Image
          w="100%"
          maxW={16}
          h={16}
          src={image}
          alt={player.color_aspect.name}
          filter="drop-shadow(0px 0px 3px black)"
        />
        <FlexContainer align="stretch" ml={2}>
          <Text color="white" casing="uppercase" textAlign="left">
            {player.color_aspect.name}
          </Text>
          <Text
            color="blueLight"
            fontWeight="normal"
            whiteSpace="initial"
            textAlign="left"
          >
            {player.color_aspect.description}
          </Text>
        </FlexContainer>
      </Wrap>
    </ProfileSection>
  );
};

export default PlayerType;
