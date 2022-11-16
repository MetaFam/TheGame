import { Box, Container, Text, useBreakpointValue } from '@metafam/ds';
import BackgroundImageDesktop from 'assets/landing/sections/section-4.jpg';
import BackgroundImageMobile from 'assets/landing/sections/section-4.sm.jpg';
import { FullPageContainer } from 'components/Container';
import { useMotionDetector } from 'lib/hooks/useMotionDetector';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';
import { LandingPageSectionProps } from './landingSection';

export const WildWeb: React.FC<LandingPageSectionProps> = ({
  section,
  nextSection,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const root = typeof window !== 'undefined' ? document.body : null;
  const noMotion = useMotionDetector(root);
  const displayElement = noMotion ? true : !!onScreen;
  const responsiveBg = useBreakpointValue({
    base: BackgroundImageMobile,
    md: BackgroundImageDesktop,
  });

  return (
    <FullPageContainer
      bgImageUrl={responsiveBg?.src}
      backgroundBlendMode="normal"
      backgroundPosition="center"
      id={section.internalLinkId}
      position="relative"
    >
      <Container
        display="flex"
        maxW={{
          base: '100%',
          md: 'xl',
          lg: '7xl',
          '2xl': 'full',
          '4xl': '90%',
        }}
        px={{ base: 'inherit', lg: 14 }}
        height="100%"
        alignItems="center"
        justifyContent={{ base: 'center', lg: 'flex-start' }}
      >
        <Box
          {...{ ref }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={{ base: '90%', md: 'sm', '2xl': 'xl' }}
          fontSize={{ base: 'lg', '2xl': '2xl' }}
          lineHeight={{ base: 'lg', '2xl': '2xl' }}
          fontWeight="normal"
          pl={0}
          zIndex={100}
          transform={`translate3d(0, ${displayElement ? '0' : '50px'}, 0)`}
          opacity={displayElement ? 1 : 0}
          transition={
            'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in'
          }
        >
          <Text
            as="h2"
            pb={{ base: '1.188rem', '2xl': '3xl' }}
            fontSize={{ base: '3xl', '2xl': '5xl' }}
            fontWeight="bold"
            className="gradient-text"
          >
            The problem?
          </Text>
          <Text
            pb={{ base: '1.188rem', '2xl': '3xl' }}
            fontSize={{ base: 'xl', '2xl': '3xl' }}
          >
            A new world is being built but it’s{' '}
            <Text as="strong" className="gradient-text">
              hard to&nbsp;navigate.
            </Text>
          </Text>
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            The resources, building blocks &amp; tools are all over the place{' '}
            <Text as="strong" className="gradient-text">
              but the maps are inexistent.
            </Text>
          </Text>
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            There are pitfalls, gold-rushing cowboys &amp; snake oil salesmen at
            every corner.
          </Text>

          <Text as="strong" className="gradient-text" textTransform="uppercase">
            It’s a Wild Web.
          </Text>
        </Box>
      </Container>
      <LandingNextButton section={nextSection?.internalLinkId} />
    </FullPageContainer>
  );
};
