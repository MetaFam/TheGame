import { Container } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-6.png';
import { FullPageContainer } from 'components/Container';
import { GameContextProvider } from 'contexts/GameContext';
import React from 'react';

import { LandingNextButton } from './LandingNextButton';
import { OnboardingGame } from './OnboardingGame/Game';

export const Onboard: React.FC = () => {
  const section = 'onboard';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      backgroundSize={{ base: '170%', lg: 'auto 100%' }}
      id={section}
      position="relative"
      fontSize={{ base: 'xl', md: '5xl' }}
      spacing={12}
      px={{ base: 3, lg: 12 }}
      py="6rem"
      minH={{ base: 'unset', md: '100vh' }}
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="auto"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <GameContextProvider>
          <OnboardingGame />
        </GameContextProvider>
      </Container>
      <LandingNextButton py={2} section="join-us" />
    </FullPageContainer>
  );
};
