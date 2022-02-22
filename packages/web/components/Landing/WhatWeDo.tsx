import {
  Box,
  Button,
  Container,
  ListItem,
  Text,
  UnorderedList,
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
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          fontSize={{ base: 'md', md: '3xl', xl: '3xl', '2xl': '6xl' }}
          lineHeight={{
            base: '1.25rem',
            md: '2.4rem',
            xl: '2rem',
            '2xl': '3.5rem',
          }}
          maxWidth={{ base: '95%', md: '3xl', xl: '2xl', '2xl': '5xl' }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text as="h2" fontWeight="700">
            What are we doing?
          </Text>
          <UnorderedList
            d="flex"
            alignContent="flex-start"
            justifyContent="space-between"
            flexFlow={{ base: 'column wrap', md: 'row wrap' }}
            pb={{ base: 2, md: '2.188rem', xl: 3, '2xl': '2.188rem' }}
            listStyleType="none"
            mt={3}
            ml={0}
            opacity="0.8"
            sx={{
              li: {
                flex: { base: '0 0 100%', md: '0 0 48%' },
                width: { base: '100%', md: '48%' },
                mb: { base: 4, md: 3 },
                h3: {
                  fontSize: { base: 'xl', md: '4xl', xl: '3xl', '2xl': '4xl' },
                  mb: { base: 2, md: 2 },
                },
                p: {
                  fontSize: { base: 'sm', md: 'lg', xl: 'md', '2xl': 'lg' },
                  lineHeight: { base: '1.25rem', md: '1.75rem' },
                },
              },
            }}
          >
            <ListItem>
              <Text as="h3">Producing content</Text>
              <Text>
                Educational content such as Playbooks & Great Houses as well as
                something more fun, like our podcasts, news or recordings of the
                below.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="h3">Organizing events</Text>
              <Text>
                Regularly bringing awesome people to present at our community
                calls or do workshops. Also organized a conference, a hackathon
                & a festival.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="h3">Assembling the puzzle</Text>
              <Text>
                Building things like MetaSys & MyMeta as well as the MetaOS - to
                make it easy to integrate other people's building blocks
              </Text>
            </ListItem>
            <ListItem>
              <Text as="h3">Uniting aligned peoples</Text>
              <Text>
                Bringing together anyone aligned on the idea of building a new
                kind of society; individuals joining MetaFam as well as projects
                joining MetaAlliance.
              </Text>
            </ListItem>
          </UnorderedList>

          <Text fontSize={{ base: '' }} fontWeight="700" width="100%">
            In short, anything & everything related to DAOs & helping people
            build the future they want to live in.
          </Text>
        </Box>
      </Container>
      <Box
        pos="absolute"
        bottom="0"
        py={{ base: 4, md: 20 }}
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        zIndex={150}
      >
        <Button
          colorScheme="white"
          size="lg"
          textShadow="0 0 5px rgba(0,0,0,0.8)"
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('section-8')}
        >
          Next
        </Button>
      </Box>
    </FullPageContainer>
  );
};
