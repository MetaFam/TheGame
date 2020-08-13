import { Image, MetaButton, MetaHeading, Text } from '@metafam/ds';
import React from 'react';

import PlayersImage from '../public/images/players.png';
import { FlexContainer } from './Container';

type Props = {
  next: () => void;
};

export const WelcomePlayer: React.FC<Props> = ({ next }) => {
  return (
    <FlexContainer flex={1} maxWidth="45rem">
      <Image src={PlayersImage} />
      <MetaHeading m={5}>Become a Player</MetaHeading>
      <Text fontSize="lg" textAlign="center">
        MetaGame is an idea we can build a new world, a layer atop of the old
        one. A more collaborative, transparent & caring world. A world in which
        self-interest is better aligned with the common good & the ones creating
        value are more directly rewarded.
      </Text>
      <MetaButton
        onClick={() => {
          next();
        }}
        mt={10}
      >
        Register
      </MetaButton>
    </FlexContainer>
  );
};
