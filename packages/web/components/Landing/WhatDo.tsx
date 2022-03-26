import {
  Box,
  Container,
  ListItem,
  Text,
  UnorderedList,
  useBreakpointValue,
} from '@metafam/ds';
import BackgroundImageMobile from 'assets/landing/sections/section-5.sm.png';
import BackgroundImageDesktop from 'assets/landing/whatdo/computer.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';

export const WhatDo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'what-do';
  const responsiveBg = useBreakpointValue({
    base: BackgroundImageMobile,
    md: BackgroundImageDesktop,
  });

  return (
    <FullPageContainer
      bgImageUrl={responsiveBg}
      backgroundBlendMode="normal"
      backgroundPosition={{ base: 'top', xl: 'center' }}
      backgroundSize={{ base: 'contain', xl: 'cover' }}
      backgroundRepeat="no-repeat"
      id={section}
      position="relative"
      overflow="clip"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: 'xl', lg: '7xl', '2xl': '8xl', '4xl': '70%' }}
        height="100%"
        alignItems={{ base: 'flex-start', xl: 'center' }}
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent={{ base: 'flex-start', xl: 'center' }}
          fontSize={{ base: 'md', md: 'xl', xl: 'xl', '2xl': '3xl' }}
          lineHeight={{
            base: '1.25rem',
            md: '2.4rem',
            xl: '2rem',
            '2xl': '2.5rem',
          }}
          maxWidth={{
            base: '90%',
            md: '3xl',
            xl: '5xl',
            '2xl': '8xl',
            '4xl': '100%',
          }}
          maxH={{ base: '60%', md: '90%', lg: 'initial' }}
          mt={{ base: '50%', xl: 'unset' }}
          overflowY={{ base: 'auto', xl: 'visible' }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
          sx={{
            h2: {
              color: 'landing500',
              fontSize: { base: 'xl', md: '3xl', xl: '3xl', '2xl': '4xl' },
              textAlign: 'center',
              textShadow: '0 0 5px var(--chakra-colors-landing500)',
              transform: {
                base: 'none',
                xl: 'translate3d(0, 15px, 0)',
                '4xl': 'translate3d(0, -60px, 0)',
              },
            },
          }}
        >
          <Text as="h2" fontWeight="700">
            What are we doing?
          </Text>
          <UnorderedList
            d={{ base: 'flex', lg: 'grid' }}
            flexFlow={{ base: 'column wrap', lg: 'unset' }}
            pb={{ base: 2, xl: 0, '2xl': '2.188rem' }}
            listStyleType="none"
            mt={{ base: 8, xl: 0, '2xl': -14 }}
            ml={0}
            sx={{
              gridTemplateAreas: {
                base: 'unset',
                lg: '"first . third" "second . fourth"',
              },
              gridTemplateColumns: '3fr 6fr 3fr',
              gridTemplateRows: 'repeat(2, 1fr)',
              li: {
                flex: { base: '0 0 100%' },
                width: { base: '100%' },
                mb: { base: 4, xl: 8, '2xl': 14 },
                h3: {
                  fontSize: { base: 'lg', xl: 'xl', '2xl': '2xl' },
                  lineHeight: { base: '1.25rem', '2xl': '1.75rem' },
                  mb: { base: 0, '2xl': 2 },
                  span: {
                    color: 'landing300',
                    display: { base: 'inline', xl: 'block' },
                    fontSize: 'md',
                    pr: { base: 2, xl: 0 },
                    pl: { base: 0, xl: 2 },
                    pb: { base: 0, md: 0, '2xl': 0 },
                  },
                },
                p: {
                  fontSize: { base: 'sm', md: 'lg', xl: 'md', '2xl': 'md' },
                  lineHeight: { base: '1.25rem', '2xl': '1.75rem' },
                },
              },
            }}
          >
            <ListItem gridArea="first">
              <Text as="h3">
                <Text as="span">01</Text>Producing content
              </Text>
              <Text>
                Educational content such as Playbooks &amp; Great Houses as well
                as something more fun, like our podcasts, news or recordings of
                the below.
              </Text>
            </ListItem>
            <ListItem gridArea="second">
              <Text as="h3">
                <Text as="span">02</Text>Organizing events
              </Text>
              <Text>
                Regularly bringing awesome people to present at our community
                calls or do workshops. Also organized a conference, a hackathon
                &amp; a festival.
              </Text>
            </ListItem>
            <ListItem gridArea="third" justifySelf="end">
              <Text as="h3">
                <Text as="span">03</Text>Assembling the puzzle
              </Text>
              <Text>
                Building things like MetaSys &amp; MyMeta as well as the MetaOS
                - to make it easy to integrate other people's building blocks
              </Text>
            </ListItem>
            <ListItem gridArea="fourth" justifySelf="end">
              <Text as="h3">
                <Text as="span">04</Text>Uniting aligned peoples
              </Text>
              <Text>
                Bringing together anyone aligned on the idea of building a new
                kind of society; individuals joining MetaFam as well as projects
                joining MetaAlliance.
              </Text>
            </ListItem>
          </UnorderedList>

          <Text
            fontWeight={700}
            width={{ base: '95%', xl: '100%', '2xl': '50%' }}
            align="center"
            mx="auto"
          >
            In short, anything &amp; everything related to DAOs &amp; helping
            people build the future they want to live in.
          </Text>
        </Box>
      </Container>
      {/* <Box
        position="absolute"
        top="25vh"
        left="0"
        width="100vw"
        height="50vh"
        overflow="clip"
      >
        <Flex
          width="100vw"
          height="100%"
          minH="100%"
          // overflow="hidden"
        >
          <Box
            ref={slidesContainer}
            className="slideContainer"
            width="400%"
            height="100%"
            border="1px solid"
            overflowX="auto"
            display="flex"
            flexFlow="row nowrap"
            sx={{
              '.slide': {
                flex: '0 0 100vw',
                width: '100vw',
                border: '1px solid pink',
                minH: '100%'
              }
            }}
          >
            <Box
              className="slide"
              ref={(e: HTMLDivElement) => createSlidesRefs(e, 0)}
            >One</Box>
            <Box
              className="slide"
              ref={(e: HTMLDivElement) => createSlidesRefs(e, 2)}
            >Two</Box>
            <Box
              className="slide"
              ref={(e: HTMLDivElement) => createSlidesRefs(e, 3)}
            >Three</Box>
            <Box
              className="slide"
              ref={(e: HTMLDivElement) => createSlidesRefs(e, 4)}
            >Four</Box>
          </Box>
        </Flex>
      </Box> */}
      <LandingNextButton section="join-us" />
    </FullPageContainer>
  );
};
