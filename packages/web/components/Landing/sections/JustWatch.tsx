import { Box, Button, Container, Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/just-watch-background.png';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export const JustWatch: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, '300px');
  const { push } = useRouter();

  const handleSectionNav = (joinUrl: string) => {
    push(`${joinUrl}`);
  };

  return (
    <Container
      id="section-13"
      position="relative"
      centerContent
      h="100vh"
      maxW="full"
      backgroundImage={`url(${BackgroundImage})`}
      bgPosition={{ base: 'center right', lg: 'center' }}
      bgSize="cover"
      zIndex={1}
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={{ base: '100%', lg: '2xl' }}
          pl={{ base: 0, md: 0 }}
          textAlign="center"
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '20vh'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <VStack>
            <Text
              fontSize={{ base: '4xl', md: '8xl' }}
              lineHeight={{ base: '3rem', md: '5rem' }}
              fontWeight="700"
              color="white"
              mb="2.188rem"
            >
              The revolution will be televized, but{' '}
              <Text as="span" className="gradient-text">
                don’t just watch
              </Text>
              .
            </Text>
            <Button
              className="border-grad"
              colorScheme="white"
              rounded="md"
              size="lg"
              maxW="xl"
              textTransform="uppercase"
              onClick={() =>
                handleSectionNav(
                  'https://wiki.metagame.wtf/docs/enter-metagame/join-metagame',
                )
              }
            >
              Join us here
            </Button>
          </VStack>
        </Box>
      </Container>
    </Container>
  );
};
