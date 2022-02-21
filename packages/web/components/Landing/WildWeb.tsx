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
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth="4xl"
          fontSize={{ base: 'md', md: '2.5rem', '2xl': '3rem' }}
          lineHeight={{ base: '2rem', md: '3.5rem', '2xl': '4rem' }}
          fontWeight="normal"
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text pb={{ base: '1.188rem', md: '2.188rem' }}>
            Web3 technologies are allowing us to{' '}
            <Text fontWeight="bold">reimagine socioeconomic systems</Text> from
            the ground up.
          </Text>
          <Text pb="2.188remx">
            A new world is being built but it's{' '}
            <Text fontWeight="bold">hard to navigate.</Text>
          </Text>
          <Text pb="2.188rem">
            The resources, building blocks & tools are all over the place{' '}
            <Text fontWeight="bold">but the maps are inexistent.</Text>
          </Text>
          <Text pb="2.188rem">
            There are pitfalls, gold rushing cowboys & snake oil salesmen at
            every corner.
          </Text>

          <Text textTransform="uppercase">It’s a Wild Web.</Text>
        </Box>
      </Container>
      <Box
        pos="absolute"
        bottom="0"
        py={20}
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        zIndex={200}
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
