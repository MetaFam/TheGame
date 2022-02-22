import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/wildweb-background.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const WildWeb: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id="section-5"
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
          justifyContent="center"
          maxWidth={{ base: '95%', md: 'md', xl: '2xl', '2xl': '5xl' }}
          fontSize={{ base: 'md', md: '3xl', '2xl': '6xl' }}
          lineHeight={{ base: '1.5rem', md: '2.4rem', '2xl': '3.5rem' }}
          fontWeight="normal"
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            Web3 technologies are allowing us to{' '}
            <Text as="strong">reimagine socioeconomic systems</Text> from the
            ground up.
          </Text>
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            A new world is being built but it's{' '}
            <Text as="strong">hard to navigate.</Text>
          </Text>
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            The resources, building blocks & tools are all over the place{' '}
            <Text as="strong">but the maps are inexistent.</Text>
          </Text>
          <Text pb={{ base: '1.188rem', '2xl': '2.188rem' }}>
            There are pitfalls, gold rushing cowboys & snake oil salesmen at
            every corner.
          </Text>

          <Text as="strong" textTransform="uppercase">
            It’s a Wild Web.
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
          onClick={() => handleSectionNav('section-6')}
        >
          Next
        </Button>
      </Box>
    </FullPageContainer>
  );
};
