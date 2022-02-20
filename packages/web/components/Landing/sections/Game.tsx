import { Box, Button, Container, Link, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/game-background.png';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Game: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, '300px');
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Container
      id="section-2"
      position="relative"
      centerContent
      h="100vh"
      maxW="full"
      backgroundImage={`url(${BackgroundImage})`}
      bgPosition="center"
      bgSize="cover"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="100%"
        alignItems="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth="2xl"
          fontSize={{ base: '1.5rem', md: '2.375rem' }}
          lineHeight={{ base: '2.35rem', md: '3.5rem' }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '20vh'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text fontWeight="normal" color="white">
            “Metagame is any approach to a game that transcends or operates
            outside of the prescribed rules of the game, uses external factors
            to affect the game, or goes beyond the supposed limits or
            environment set by the game.”
            <Text textAlign="right">
              - From{' '}
              <Link
                color="#79F8FB"
                href="https://en.wikipedia.org/wiki/Metagaming"
                fontWeight="normal"
                isExternal
                textDecoration="none"
              >
                The Wiki
              </Link>
            </Text>
          </Text>
        </Box>
      </Container>
      <Box
        pos="absolute"
        bottom="0"
        py={20}
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        zIndex={200}
        centerContent
      >
        <Button
          colorScheme="white"
          size="lg"
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('section-3')}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};
