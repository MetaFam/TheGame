import { Container, Flex, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-3.jpg';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const Build: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'build-the-future';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      backgroundBlendMode={{ base: 'exclusion', lg: 'normal' }}
      backgroundPosition={{ base: '8%', lg: 'center' }}
      id={section}
      position="relative"
      color="white"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', xl: '7xl', '2xl': 'full' }}
        px={{ base: 'inherit', lg: 14 }}
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
          maxWidth={{ base: '90%', md: 'md', '2xl': '2xl' }}
          pl={0}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? 0 : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text fontSize={{ base: 'xl', '2xl': '3xl' }}>
            People are waking up to the{' '}
            <strong>world-shaping potential of Web3 technologies</strong>.
          </Text>

          <Text pt={{ base: 4, md: 8 }}>
            They are grabbing the opportunity to{' '}
            <strong>build the future</strong> they want to live in.
          </Text>
          <Text pt={{ base: 4, md: 8 }}>
            Web3 technologies are allowing us to{' '}
            <strong>reimagine socioeconomic systems</strong> from the ground up.
          </Text>
        </Flex>
      </Container>
      <LandingNextButton section="the-wild-web" />
    </FullPageContainer>
  );
};
