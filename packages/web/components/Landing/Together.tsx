import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/together-background.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Together: React.FC = () => {
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
          justifyItems="center"
          textAlign="center"
          fontSize={{ base: 'xl', md: '2.5rem', '2xl': '3rem' }}
          lineHeight={{ base: '2rem', md: '3.5rem', '2xl': '4rem' }}
          fontWeight="normal"
          color="white"
          bgGradient=" linear-gradient(180deg, #FFFFFF 15.3%, #FD208A 85.41%)"
          bgClip="text"
          maxWidth="6xl"
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text pb={{ base: '1.188rem', md: '3.125rem' }}>
            {' '}
            We are bringing together the people & building blocks aligned on the
            idea of creating a new kind of society.
          </Text>
          <Text pb={{ base: '1.188rem', md: '3.125rem' }}>
            {' '}
            One that is optimized for human wellbeing rather than profit.
          </Text>
          <Text pb={{ base: '1.188rem', md: '3.125rem' }}>
            One that revolves around solving problems & living well, in balance
            with nature.
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
          onClick={() => handleSectionNav('section-7')}
        >
          Next
        </Button>
      </Box>
    </FullPageContainer>
  );
};
