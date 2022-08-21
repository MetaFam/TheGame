import { Container } from '@metafam/ds';
import { FullPageContainer } from 'components/Container';
import { GameContextProvider } from 'contexts/GameContext';
import React from 'react';

import { LandingNextButton } from './LandingNextButton';
import { OnboardingGame } from './OnboardingGame/Game';
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
      py="6rem"
      minH={{ base: 'unset', md: '100vh' }}
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="auto"
        alignItems="flex-start"
        justifyContent="flex-start"
        zIndex={5}
      >
        <GameContextProvider>
          <OnboardingGame />
        </GameContextProvider>
      </Container>
      <Rain top={-12} effectOpacity={0.3} />
      {/* <Box
        backgroundImage={BackgroundImage}
        backgroundBlendMode="normal"
        backgroundSize={{ base: '170%', lg: 'contain' }}
        backgroundColor="transparent"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        minH="100vh"
        minW="100vw"
        position="absolute"
        top={-12}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
      /> */}
      <LandingNextButton py={2} section="join-us" />
    </FullPageContainer>
  );
};
