import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/frontier-background.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Frontier: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id="section-6"
      position="relative"
      pl={{ base: '0', md: '8.563rem' }}
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="100%"
        alignItems="center"
        justifyContent="start"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          fontSize={{ base: 'xl', md: '2.5rem', '2xl': '3rem' }}
          lineHeight={{ base: '2rem', md: '3.5rem', '2xl': '4rem' }}
          fontWeight="normal"
          maxWidth="2xl"
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text
            fontWeight="normal"
            color="white"
            display="flex"
            flexDirection="column"
            maxWidth="32.75rem"
          >
            Many have already woken up to the world-shaping potential of Web3
            technologies.
          </Text>

          <Text
            pt="3.5rem"
            color="white"
            display="flex"
            flexDirection="column"
            maxWidth="32.75rem"
          >
            Some are grabbing the opportunity to build the future they want to
            live in.
          </Text>
        </Box>
      </Container>
      <Box
        pos="absolute"
        bottom="0"
        py={20}
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        zIndex={150}
      >
        <Button
          colorScheme="white"
          size="lg"
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('section-7')}
        >
          Next
        </Button>
      </Box>
    </FullPageContainer>
  );
};
