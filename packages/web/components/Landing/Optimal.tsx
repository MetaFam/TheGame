import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/optimal-background.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const Optimal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'play-life';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage.src}
      id={section}
      position="relative"
    >
      <Container
        display="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          {...{ ref }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={{ base: '95%', xl: '2xl', '2xl': '6xl' }}
          fontSize={{ base: 'lg', md: '3xl', '2xl': '6xl' }}
          lineHeight={{ base: '2rem', md: '2.4rem', '2xl': '3.5rem' }}
          pt={0}
          pl={0}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text pb="2.188rem" textAlign="center">
            To find your metagame means
            <br /> to{' '}
            <Text as="span" fontWeight="bold" color="cyanText">
              play life in the optimal way.
            </Text>
          </Text>
          <Text as="p" textAlign="center">
            By coordinating with others on building a better world; doing things
            that
            <Text as="span" fontWeight="bold" color="cyanText">
              {' '}
              create a positive impact
            </Text>
            ,<br />
            <Text as="span" fontWeight="bold" color="cyanText">
              make you happy
            </Text>
            , AND
            <Text as="span" fontWeight="bold" color="cyanText">
              {' '}
              earn you money
            </Text>
            .
          </Text>
        </Box>
      </Container>
      <LandingNextButton section="for-who" />
    </FullPageContainer>
  );
};
