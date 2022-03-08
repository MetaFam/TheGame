import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/who-background.png';
import { FullPageContainer } from 'components/Container';
import { Cards } from 'components/Landing/Cards';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const Who: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'for-who';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
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
        alignItems="center"
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth="2xl"
          fontSize={{ base: '1.5rem', md: '5xl', xl: '4xl', '2xl': '3rem' }}
          lineHeight={{
            base: '2.25rem',
            md: '2rem',
            xl: '2rem',
            '2xl': '4rem',
          }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text textAlign="center">So, whom is it for?</Text>
        </Box>
      </Container>
      <Cards />
      <LandingNextButton py={2} section="join-us" />
    </FullPageContainer>
  );
};
