import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/game-background.png';
import { FullPageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const Game: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'wtf-is-a-metagame';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id={section}
      position="relative"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', xl: '7xl', '2xl': '8xl' }}
        height="100%"
        alignItems="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={{ base: 'unset', md: 'md', xl: 'lg', '2xl': '2xl' }}
          fontSize={{ base: '1.5rem', '2xl': '2.375rem' }}
          lineHeight={{ base: '2.35rem', '2xl': '3.5rem' }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text fontWeight="normal" color="white">
            “Metagame is any approach to a game that transcends or operates
            outside of the prescribed rules of the game, uses external factors
            to affect the game, or goes beyond the supposed limits or
            environment set by the game.”
            <Text textAlign="right" as="span">
              - From{' '}
              <MetaLink
                color="#79F8FB"
                href="https://en.wikipedia.org/wiki/Metagaming"
                fontWeight="normal"
                isExternal
                textDecoration="none"
              >
                The Wiki
              </MetaLink>
            </Text>
          </Text>
        </Box>
      </Container>
      <LandingNextButton section="build-the-future" />
    </FullPageContainer>
  );
};
