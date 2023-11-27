import {
  Box,
  Button,
  ChevronDownIcon,
  Container,
  Flex,
  Heading,
  Image,
  MetaButton,
  Stack,
  Text,
  useBreakpointValue,
} from '@metafam/ds';
import BubbleLg from 'assets/landing/pretty/bubble-large.svg';
import BubbleSm from 'assets/landing/pretty/bubble-small.svg';
import BackgroundImage5xl from 'assets/landing/sections/section-1.jpg';
import BackgroundImageMobile from 'assets/landing/sections/section-1.sm.jpg';
import BackgroundImage2xl from 'assets/landing/sections/section-1-2xl.jpg';
import BackgroundImage4xl from 'assets/landing/sections/section-1-4xl.jpg';
import BackgroundImageLg from 'assets/landing/sections/section-1-lg.jpg';
import { FullPageContainer } from 'components/Container';
import { useMotionDetector } from 'lib/hooks/useMotionDetector';
import React, { useEffect, useState } from 'react';

import { upDownAnimation, upDownAnimationLong } from './animations';
import { LandingPageSectionProps } from './landingSection';

export const Intro: React.FC<LandingPageSectionProps> = ({
  section,
  activeSectionIndex,
}) => {
  const [onScreen, setOnScreen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const root = typeof window !== 'undefined' ? document.body : null;
  const noMotion = useMotionDetector(root);
  const displayElement = noMotion ? true : !!onScreen;
  const responsiveBg = useBreakpointValue({
    base: BackgroundImageMobile,
    xl: BackgroundImageLg,
    '2xl': BackgroundImage2xl,
    '3xl': BackgroundImage4xl,
    '5xl': BackgroundImage5xl,
  });

  const toggleQuote = () => {
    setShowQuote(!showQuote);
    return null;
  };

  useEffect(() => {
    setTimeout(() => setOnScreen(activeSectionIndex === 0), 500);
  }, [activeSectionIndex]);

  return (
    <FullPageContainer
      id={section.internalLinkId}
      bgImageUrl={responsiveBg?.src}
      backgroundPosition="top"
      backgroundSize="cover"
      spacing={{ base: 8, xl: 20 }}
      justify="flex-end"
    >
      <Container
        display="flex"
        maxW={{ base: '100%', xl: '7xl', '2xl': 'full' }}
        height="100%"
        alignItems="flex-start"
        justifyContent={{ base: 'flex-start', lg: 'center' }}
        pt={{ base: 0, xl: 14 }}
        pl={{ base: 12 }}
        pb={'5'}
        bg="linear-gradient(0deg, #140231 5%, rgba(19, 1, 49, 0.00) 40%);"
        position="absolute"
        bottom="0"
        left="0"
        right="0"
      >
        <Stack
          pos="relative"
          align="flex-start"
          justify="center"
          spacing={0}
          mt={{ base: 16, lg: -10, '2xl': 0 }}
          pr={20}
          pb={10}
          h="100%"
          w="100%"
          direction={{ base: 'column', lg: 'column' }}
          zIndex={100}
          transform={`translate3d(0, ${displayElement ? 0 : '3rem'}, 0)`}
          opacity={displayElement ? 1 : 0}
          transition={
            'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in'
          }
        >
          <Flex h="100%" w="100%" direction="column">
            <Heading
              flex={1}
              as="h1"
              fontFamily="landingHeading"
              textTransform="uppercase"
              className="gradient"
              fontSize={{ base: 'lg', lg: 'md', '3xl': 'lg', '4xl': '3xl' }}
              fontWeight={100}
              my={0}
              top={0}
              textAlign={{ base: 'left', lg: 'center' }}
              sx={{
                strong: {
                  fontWeight: 300,
                },
              }}
            >
              <Text as="strong">A</Text> Massive{' '}
              <Text as="strong">Online Coordination</Text> Game
            </Heading>
            <Box w="100%" pb={{ base: 10, lg: 0 }}>
              <Heading
                as="h1"
                fontFamily="exo2"
                fontWeight="normal"
                fontSize={{ base: '2xl', lg: '5xl' }}
                textAlign={{ base: 'left', lg: 'center' }}
              >
                Learn, Connect, Create
              </Heading>
              <Text
                mt={3}
                fontSize={{ base: 'lg', lg: '2xl' }}
                textAlign={{ base: 'left', lg: 'center' }}
              >
                MetaGame is a decentralized factory for builders of the future{' '}
                <br /> a DAO incubation & growth platform.
              </Text>
              <Flex w="100%" justify="center" mt={8} gap={6}>
                <Button
                  as="a"
                  variant="outline"
                  colorScheme="blue"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  px={14}
                  size="lg"
                  fontSize="sm"
                  href="#wtf-is-a-metagame"
                >
                  learn more
                </Button>
                <MetaButton as="a" href="#join-us">
                  connect
                </MetaButton>
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </FullPageContainer>
  );
};

export const ScrollLink = ({
  showQuote,
  toggleQuote,
}: {
  showQuote: boolean;
  toggleQuote: () => null;
}) => (
  <Box
    fontFamily="landingHeading"
    position="absolute"
    bottom={0}
    left={0}
    width="100%"
    textAlign="center"
    fontWeight={300}
    zIndex={100}
    sx={{
      transition: 'all 0.3s 0.2s ease-in-out',
      transform: {
        base: `translate3d(0, ${showQuote ? -265 : 0}px, 0)`,
        lg: `translate3d(0, ${showQuote ? -235 : 0}px, 0)`,
      },
    }}
  >
    <Box
      display="flex"
      flexFlow="column wrap"
      // border="1px solid"
      sx={{
        button: {
          border: `1px solid ${'white'}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minW: { base: '2.25rem', '4xl': '3.5rem' },
          maxW: { base: '2.25rem', '4xl': '3.5rem' },
          maxH: { base: '2.25rem', '4xl': '3.5rem' },
          height: { base: '2.25rem', '4xl': '3.5rem' },
          mx: 'auto',
        },
      }}
    >
      <Text
        as="span"
        fontSize={{ base: 'xs', '4xl': 'md' }}
        mx="auto"
        pb={3}
        maxW={{ base: '3xs', lg: 'unset' }}
        opacity={showQuote ? 1 : 0}
        textAlign={{ base: 'left', lg: 'center' }}
        transform={`translate3d(${showQuote ? 0 : 400}px, 35px, 0)`}
        sx={{
          transition: 'all 0.3s 0.2s ease-in-out',
        }}
      >
        {`Scroll, not click 😄. But as you're here, 🐙...here's a word or two from a great man 👇`}
      </Text>
      <Text
        as="span"
        fontSize={{ base: 'xs', '4xl': 'md' }}
        mx="auto"
        pb={3}
        maxW={{ base: '3xs', lg: 'unset' }}
        opacity={showQuote ? 0 : 1}
        textAlign={{ base: 'left', lg: 'center' }}
        transform={`translate3d(${showQuote ? -400 : 0}px, 0, 0)`}
        sx={{
          transition: 'all 0.3s 0.2s ease-in-out',
        }}
      >
        {'Scroll down'}
      </Text>
      <Button
        colorScheme="ghost"
        opacity={showQuote ? 0.5 : 1}
        onClick={toggleQuote}
      >
        <ChevronDownIcon />
      </Button>
      <Box
        as="span"
        opacity={showQuote ? 0.5 : 1}
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '1px',
          height: '50px',
          mx: 'auto',
          transition: 'all 0.3s 0.2s ease-in-out',
        }}
      ></Box>
    </Box>
  </Box>
);

export const QuoteLayer = ({
  quote,
  attr,
  showQuote,
  toggleQuote,
}: {
  quote: string;
  attr: string;
  showQuote: boolean;
  toggleQuote: () => null;
}) => (
  <Box
    className="quote-layer"
    position="absolute"
    bottom={0}
    left="5vw"
    width="90vw"
    textAlign="center"
    transition={'all 0.3s 0.2s ease-in-out'}
    zIndex={showQuote ? 101 : 99}
  >
    <Box
      className="bubbles"
      position="static"
      bottom={0}
      left={0}
      minW="100vw"
      height="100%"
      onClick={toggleQuote}
      transition={'transform 0.3s 0.3s ease-in-out'}
      transform={`translate3d(0, ${showQuote ? -50 : 300}px, 0)`}
      zIndex={101}
      sx={{
        img: {
          position: 'absolute',
          opacity: showQuote ? 1 : 0,
          transition: 'opacity 0.3s 0.3s ease-in-out',
        },
      }}
    >
      <Image
        src={BubbleSm.src}
        top="60%"
        left="10%"
        animation={upDownAnimation}
      />
      <Image
        src={BubbleLg.src}
        top="3%"
        left="20%"
        animation={upDownAnimationLong}
      />
      <Image
        src={BubbleSm.src}
        top="30%"
        right="25%"
        animation={upDownAnimation}
      />
      <Image
        src={BubbleLg.src}
        top="60%"
        right="15%"
        animation={upDownAnimationLong}
      />
    </Box>
    <Box
      as="figure"
      position="relative"
      py={8}
      mx="auto"
      maxW="4xl"
      opacity={showQuote ? 1 : 0}
      textAlign="left"
      transition={'transform 0.3s 0.2s ease-in-out, opacity 0.3s 0.4s ease-in'}
      transform={`translate3d(0, ${showQuote ? -50 : 300}px, 0)`}
      zIndex={2}
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '1px',
          width: '100%',
          backgroundImage:
            'linear-gradient(89.9deg, rgba(90, 50, 230, 0) 0.13%, rgba(255, 255, 255, 0.6) 98.25%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: '1px',
          width: '100%',
          backgroundImage:
            'linear-gradient(89.9deg, rgba(141, 101, 134, 0.18) 6.43%, rgba(90, 50, 230, 0.62) 46.51%, rgba(90, 50, 230, 0) 104.06%)',
        },
      }}
    >
      <Text
        as="blockquote"
        position="relative"
        fontFamily="body"
        fontSize={{ base: 'lg', lg: '3xl' }}
        fontStyle="italic"
        fontWeight={100}
        textAlign="left"
        sx={{
          '&::before, &::after': {
            content: `"”"`,
            position: 'absolute',
            color: 'white',
            fontSize: '4xl',
            top: -3,
            left: -3,
          },
          '&::after': {
            top: 'unset',
            right: 0,
            bottom: 0,
            left: 'unset',
          },
        }}
      >
        {quote}
      </Text>
      <Text
        as="figcaption"
        position="relative"
        className="gradient"
        fontWeight={100}
        pt={3}
        textAlign="right"
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -2,
            right: '10%',
            height: '1px',
            width: '10%',
            backgroundImage:
              'linear-gradient(89.9deg, #8D6586 1.21%, #5A32E6 43.43%, rgba(90, 50, 230, 0) 104.06%)',
          },
        }}
      >
        &mdash; {attr}
      </Text>
    </Box>
  </Box>
);
