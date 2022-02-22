import {
  Box,
  Button,
  Container,
  ListItem,
  OrderedList,
  Text,
} from '@metafam/ds';
import BackgroundImage from 'assets/landing/whatWeDo-background.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const WhatWeDo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id="section-7"
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
          fontSize={{ base: 'lg', md: '2.5rem', '2xl': '3rem' }}
          lineHeight={{ base: '2rem', md: '3.5rem', '2xl': '4rem' }}
          maxWidth="5xl"
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text fontWeight="700">What are we doing?</Text>
          <OrderedList pb="2.188rem" fontWeight="300" opacity="0.8">
            <ListItem>Curating knowledge </ListItem>
            <ListItem>Organizing events</ListItem>
            <ListItem>Producing content</ListItem>
            <ListItem>Building technologies</ListItem>
            <ListItem>Uniting aligned people & communities </ListItem>
            <ListItem>
              Putting together the pieces of the New World puzzle
            </ListItem>
          </OrderedList>

          <Text fontWeight="700" width="100%">
            In short, anything & everything related to DAOs & helping people
            build the future they want to live in
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
          onClick={() => handleSectionNav('section-8')}
        >
          Next
        </Button>
      </Box>
    </FullPageContainer>
  );
};
