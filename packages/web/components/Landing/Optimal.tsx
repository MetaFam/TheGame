import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/optimal-background.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Optimal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id="section-8"
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
          maxWidth={{ base: '95%', xl: '2xl', '2xl': '6xl' }}
          fontSize={{ base: 'lg', md: '3xl', '2xl': '6xl' }}
          lineHeight={{ base: '2rem', md: '2.4rem', '2xl': '3.5rem' }}
          pt={{ base: 0, lg: 0 }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text pb="2.188rem" textAlign="center">
            To find your metagame means
            <br /> to{' '}
            <Text as="span" fontWeight="bold" color="cyanText">
              play life in the optimal way.
            </Text>
          </Text>
          <Text as="p" textAlign="center">
            By coordinating with others on building a better world; doing things
            that create a{' '}
            <Text as="span" fontWeight="bold" color="cyanText">
              {' '}
              a positive impact
              <br />{' '}
            </Text>{' '}
            make
            <Text as="span" fontWeight="bold" color="cyanText">
              {' '}
              you happy{' '}
            </Text>
            AND
            <Text as="span" fontWeight="bold" color="cyanText">
              {' '}
              earn you money.
            </Text>
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
          onClick={() => handleSectionNav('section-9')}
        >
          Next
        </Button>
      </Box>
    </FullPageContainer>
  );
};
