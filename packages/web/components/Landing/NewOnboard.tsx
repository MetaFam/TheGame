import { Container, Text } from '@metafam/ds';
import { FullPageContainer } from 'components/Container';
import { GameContextProvider } from 'contexts/GameContext';
import React from 'react';

import { OnboardingGame } from './OnboardingGame';
import { Rain } from './OnboardingGame/Rain';

export const NewOnboard: React.FC = () => {
  const section = 'onboard';

  return (
    <FullPageContainer
      id={section}
      position="relative"
      overflow="clip"
      fontSize={{ base: 'xl', md: '5xl' }}
      spacing={12}
      px={{ base: 3, lg: 12 }}
      py={{ base: 6, lg: '6rem' }}
      minH="100vh"
    >
      <Container
        display="flex"
        flexDirection="column"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height={{ base: '100vh', lg: 'auto' }}
        alignItems="start"
        justifyContent="center"
        zIndex={5}
      >
        <Text>Join MetaGame as</Text>
        <Container
          maxW="md"
          bg="tranparent"
          border="1px solid red"
          borderRadius={8}
          color="white"
        >
          Players are here to learn, contribute labor and help build MetaGame.
        </Container>
      </Container>
      <Rain top={-12} effectOpacity={0.3} />
    </FullPageContainer>
  );
};
