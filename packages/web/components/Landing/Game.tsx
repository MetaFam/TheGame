import { Box, Container, Text, useBreakpointValue } from '@metafam/ds';
import BackgroundImageDesktop from 'assets/landing/sections/section-2.jpg';
import BackgroundImageMobile from 'assets/landing/sections/section-2.sm.jpg';
import { FullPageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const Game: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'wtf-is-a-metagame';
  const responsiveBg = useBreakpointValue({
    base: BackgroundImageMobile,
    md: BackgroundImageDesktop,
  });

  return (
    <FullPageContainer
      bgImageUrl={responsiveBg}
      backgroundBlendMode={{ base: 'soft-light', lg: 'normal' }}
      id={section}
      className="section"
      position="relative"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: 'xl', lg: '7xl', '2xl': 'full' }}
        px={{ base: 'inherit', lg: 14 }}
        height="100%"
        alignItems="center"
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={{ base: '90%', md: 'sm', '2xl': 'xl' }}
          fontSize={{ base: 'lg', '2xl': '2xl' }}
          lineHeight={{ base: 'lg', '2xl': '2xl' }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
          fontWeight="normal"
          color="white"
        >
          <Text>
            “Metagame is any approach to a game that transcends or operates
            outside of the prescribed rules of the game, uses external factors
            to affect the game, or goes beyond the supposed limits or
            environment set by the game.”
          </Text>
          <Text textAlign="right">
            - From{' '}
            <MetaLink
              className="gradient"
              href="https://en.wikipedia.org/wiki/Metagaming"
              fontWeight="normal"
              textDecoration="none"
              isExternal
            >
              Wikipedia
            </MetaLink>
          </Text>
        </Box>
      </Container>
      <LandingNextButton section="build-the-future" />
    </FullPageContainer>
  );
};
