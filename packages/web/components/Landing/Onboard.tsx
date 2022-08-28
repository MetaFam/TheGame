import { Container } from '@metafam/ds';
import { FullPageContainer } from 'components/Container';
import { GameContextProvider } from 'contexts/GameContext';
import React from 'react';

import { OnboardingGame } from './OnboardingGame';
import { Rain } from './OnboardingGame/Rain';

export const Onboard: React.FC = () => {
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
      minH={{ base: '100vh', md: '100vh' }}
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height={{ base: '100vh', lg: 'auto' }}
        alignItems="flex-start"
        justifyContent="flex-start"
        zIndex={5}
      >
        <GameContextProvider>
          <OnboardingGame />
        </GameContextProvider>
      </Container>
      <Rain top={-12} effectOpacity={0.3} />
    </FullPageContainer>
  );
};
