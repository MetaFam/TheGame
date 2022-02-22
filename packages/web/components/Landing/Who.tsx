import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/who-background.png';
import { FullPageContainer } from 'components/Container';
import { Cards } from 'components/Landing/Cards';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Who: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id="section-9"
      position="relative"
      fontSize={{ base: 'xl', md: '5xl' }}
      spacing={12}
      px={12}
      py="6rem"
      minH={{ base: 'unset', md: '100vh' }}
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="auto"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth="2xl"
          fontSize={{ base: '1.5rem', md: '2.5rem', '2xl': '3rem' }}
          lineHeight={{ base: '2.25rem', md: '3.5rem', '2xl': '4rem' }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text textAlign="center">So, whom is it for?</Text>
        </Box>
      </Container>
      <Cards />
      <Box
        pos="absolute"
        bottom="0"
        py={20}
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        zIndex={150}
        centerContent
      >
        <Button
          colorScheme="white"
          size="lg"
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('section-10')}
        >
          Next
        </Button>
      </Box>
    </FullPageContainer>
  );
};
