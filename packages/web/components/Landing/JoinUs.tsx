import { Box, Button, Container, HStack, Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-6.png';
import { FullPageContainer } from 'components/Container';
import { StartButton } from 'components/Landing/StartButton';
import { MetaLink } from 'components/Link';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingFooter } from './LandingFooter';

export const JoinUs: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'join-us';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id={section}
      position="relative"
      justify={{ base: 'center', md: 'flex-end' }}
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl' }}
        flexFlow="column"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          color="landing500"
          textShadow="0 0 5px"
          textShadowColor="landing500"
          flexDirection="column"
          justifyContent="center"
          maxWidth={{ base: '100%', md: '2xl' }}
          pl={{ base: 0, md: 0 }}
          textAlign="center"
          zIndex={1}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
          sx={{
            '.screen-esque': {
              background: 'landing150',
              border: '1px solid #6916DA',
              color: 'landing500',
              textShadow: '0 0 5px',
              textShadowColor: 'landing500',
              '&--alt': {
                background: 'rgba(66, 4, 150, 0.29)',
                border: '1px solid #6916DA',
                color: 'landing500',
                textShadow: '0 0 5px',
                textShadowColor: 'landing500',
              },
            },
          }}
        >
          <VStack maxH="30vh" flex={0}>
            <Text
              fontSize={{ base: '4xl', md: '6xl' }}
              lineHeight={{ base: '2.5rem', md: '3rem' }}
              fontWeight="700"
              mb="2.188rem"
            >
              The revolution will be televized, but{' '}
              <Text
                as="span"
                opacity={onScreen ? 1 : 0}
                transition="opacity 0.5s 0.6s ease-in"
              >
                don’t just watch
              </Text>
              .
            </Text>
            <HStack
              opacity={onScreen ? 1 : 0}
              transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 1s ease-in"
            >
              <MetaLink _hover={{}} href="/dashboard">
                <Button
                  className="screen-esque--alt"
                  colorScheme="white"
                  size="lg"
                  minW="7rem"
                >
                  Watch
                </Button>
              </MetaLink>
              <StartButton text="Join" />
            </HStack>
          </VStack>
        </Box>
        <Box className="footer-content">
          <Text>Text</Text>
        </Box>
      </Container>
      <LandingFooter />
    </FullPageContainer>
  );
};
