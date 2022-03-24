import { Box, Container, ListItem, Text, UnorderedList } from '@metafam/ds';
import BackgroundImage from 'assets/landing/whatdo/computer.png';
import { FullPageContainer } from 'components/Container';
// import { gsap } from "gsap";
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';

import { LandingNextButton } from './LandingNextButton';
// import { LandingNextButton } from './LandingNextButton';

export const WhatDo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  // const slidesContainer = useRef<HTMLDivElement>(null);
  // const slides = useRef<Array<HTMLDivElement>>([]);
  const onScreen = useOnScreen(ref);
  const section = 'what-do';

  // const createSlidesRefs = (slide: HTMLDivElement, index: number) => {
  //   slides.current[index] = slide
  //   console.log('slides', slides);

  // }

  // useEffect(() => {
  //   const totalSlides = slides.current.length

  //   gsap.to(slides.current, {
  //     xPercent: 0 * (totalSlides - 1),
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: slidesContainer.current,
  //       pin: true,
  //       scrub: 1,
  //       snap: 1 / (totalSlides - 1),
  //       end: () => `+=${slidesContainer.current?.offsetWidth}`
  //     }
  //   })
  // }, []);

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id={section}
      position="relative"
      overflow="clip"
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
          fontSize={{ base: 'md', md: '3xl', xl: '3xl', '2xl': '4xl' }}
          lineHeight={{
            base: '1.25rem',
            md: '2.4rem',
            xl: '2rem',
            '2xl': '3.5rem',
          }}
          maxWidth={{ base: '95%', md: '3xl', xl: '2xl', '2xl': '8xl' }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
          sx={{
            h2: {
              color: 'landing500',
              textAlign: 'center',
              textShadow: '0 0 5px var(--chakra-colors-landing500)',
            },
          }}
        >
          <Text as="h2" fontWeight="700">
            What are we doing?
          </Text>
          <UnorderedList
            d="grid"
            // alignContent="flex-start"
            // justifyContent="space-between"
            // flexFlow={{ base: 'column wrap', md: 'row wrap' }}
            maxH="50%"
            pb={{ base: 2, md: '2.188rem', xl: 3, '2xl': '2.188rem' }}
            listStyleType="none"
            mt={-14}
            ml={0}
            opacity="0.8"
            sx={{
              gridTemplateAreas: '"first . third" "second . fourth"',
              gridTemplateColumns: '3fr 5fr 3fr',
              gridTemplateRows: 'repeat(2, 1fr)',
              li: {
                flex: { base: '0 0 100%', md: '0 0 100%' },
                width: { base: '100%', md: '100%' },
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
            <ListItem gridArea="first">
              <Text as="h3">Producing content</Text>
              <Text>
                Educational content such as Playbooks &amp; Great Houses as well
                as something more fun, like our podcasts, news or recordings of
                the below.
              </Text>
            </ListItem>
            <ListItem gridArea="second">
              <Text as="h3">Organizing events</Text>
              <Text>
                Regularly bringing awesome people to present at our community
                calls or do workshops. Also organized a conference, a hackathon
                &amp; a festival.
              </Text>
            </ListItem>
            <ListItem gridArea="third" justifySelf="end">
              <Text as="h3">Assembling the puzzle</Text>
              <Text>
                Building things like MetaSys &amp; MyMeta as well as the MetaOS
                - to make it easy to integrate other people's building blocks
              </Text>
            </ListItem>
            <ListItem gridArea="fourth" justifySelf="end">
              <Text as="h3">Uniting aligned peoples</Text>
              <Text>
                Bringing together anyone aligned on the idea of building a new
                kind of society; individuals joining MetaFam as well as projects
                joining MetaAlliance.
              </Text>
            </ListItem>
          </UnorderedList>

          <Text fontWeight={700} width="50%" align="center" mx="auto">
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
