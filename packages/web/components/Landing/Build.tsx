/* eslint-disable no-nested-ternary */
import { Container, Flex, Text, useBreakpointValue } from '@metafam/ds';
import BackgroundImageDesktop from 'assets/landing/sections/section-3.jpg';
import BackgroundImageMobile from 'assets/landing/sections/section-3.sm.jpg';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useEffect, useRef, useState } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const Build: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const root = typeof window !== 'undefined' ? document.body : null;
  const [noMotion, setNoMotion] = useState(false);
  const displayElement = noMotion ? true : !!onScreen;
  const section = 'build-the-future';
  const responsiveBg = useBreakpointValue({
    base: BackgroundImageMobile,
    md: BackgroundImageDesktop,
  });

  useEffect(() => {
    const mut = new MutationObserver(() => {
      if (root && root.classList.contains('no-motion')) {
        console.log('Build no motion');
        setNoMotion(true);
      } else {
        console.log('Build motion');
        setNoMotion(false);
      }
    });
    if (typeof window !== 'undefined' && window.matchMedia !== undefined) {
      if (root) {
        mut.observe(root, {
          attributes: true,
        });
      }
    }

    return () => {
      mut.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FullPageContainer
      bgImageUrl={responsiveBg}
      backgroundBlendMode={{ base: 'normal', lg: 'normal' }}
      backgroundPosition={{ base: '8%', lg: 'center' }}
      id={section}
      position="relative"
      color="white"
    >
      <Container
        d="flex"
        maxW={{
          base: '100%',
          md: 'xl',
          lg: '7xl',
          '2xl': 'full',
          '4xl': '80%',
        }}
        px={{ base: 'inherit', lg: 20, '4xl': 0 }}
        height="100%"
        alignItems="center"
        justifyContent={{ base: 'center', lg: 'flex-end' }}
      >
        <Flex
          ref={ref}
          direction="column"
          justify="center"
          fontSize={{ base: 'lg', '2xl': '2xl' }}
          lineHeight={{ base: 'lg', '2xl': '2xl' }}
          maxWidth={{ base: '90%', md: 'sm', '2xl': 'xl' }}
          pl={0}
          zIndex={100}
          transform={`translate3d(0, ${displayElement ? 0 : '50px'}, 0)`}
          opacity={displayElement ? 1 : 0}
          transition={
            noMotion
              ? 'none'
              : 'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in'
          }
        >
          <Text
            as="h2"
            pb={{ base: '1.188rem', '2xl': '3xl' }}
            fontSize={{ base: '3xl', '2xl': '5xl' }}
            fontWeight="bold"
            className="gradient-text"
          >
            While you’re sleeping…
          </Text>
          <Text fontSize={{ base: 'xl', '2xl': '3xl' }}>
            People are waking up to the{' '}
            <Text as="strong" className="gradient-text">
              world-shaping potential of Web3 technologies.
            </Text>
          </Text>

          <Text pt={{ base: 4, md: 8 }}>
            They are grabbing the opportunity to{' '}
            <Text as="strong" className="gradient-text">
              build the future
            </Text>{' '}
            they want to live in.
          </Text>
          <Text pt={{ base: 4, md: 8 }}>
            Web3 technologies are allowing us to{' '}
            <Text as="strong" className="gradient-text">
              reimagine socioeconomic systems
            </Text>{' '}
            from the ground up.
          </Text>
        </Flex>
      </Container>
      <LandingNextButton section="the-wild-web" />
    </FullPageContainer>
  );
};
