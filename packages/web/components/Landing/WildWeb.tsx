import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-4.jpg';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const WildWeb: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'the-wild-web';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      backgroundBlendMode={{ base: 'exclusion', lg: 'normal' }}
      backgroundPosition={{ base: '83%', lg: 'center' }}
      id={section}
      position="relative"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': 'full' }}
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
          maxWidth={{ base: '90%', md: 'md', '2xl': 'xl' }}
          fontSize={{ base: 'lg', '2xl': '2xl' }}
          lineHeight={{ base: 'lg', '2xl': '2xl' }}
          fontWeight="normal"
          pl={0}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text
            pb={{ base: '1.188rem', '2xl': '3xl' }}
            fontSize={{ base: 'xl', '2xl': '3xl' }}
          >
            A new world is being built but it's{' '}
            <Text as="strong">hard to navigate.</Text>
          </Text>
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            The resources, building blocks, &amp; tools are all over the place{' '}
            <Text as="strong">but the maps are inexistent</Text>.
          </Text>
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            There are pitfalls, gold rushing cowboys, &amp; snake oil salesmen
            at every corner.
          </Text>

          <Text as="strong" textTransform="uppercase">
            It’s a Wild Web.
          </Text>
        </Box>
      </Container>
      <LandingNextButton section="what-do" />
    </FullPageContainer>
  );
};
