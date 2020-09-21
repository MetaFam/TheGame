import { Image, MetaButton, MetaHeading, Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import PlayersImage from 'public/images/players.png';
import React from 'react';

export const WelcomePlayer: React.FC = () => {
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
      <MetaLink href="/register" _hover={{ textDecoration: 'none' }}>
        <MetaButton mt={10}>Register</MetaButton>
      </MetaLink>
    </FlexContainer>
  );
};
