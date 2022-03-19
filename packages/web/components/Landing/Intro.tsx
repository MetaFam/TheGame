import {
  Box,
  Button,
  ChevronDownIcon,
  Container,
  Heading,
  Image,
  Stack,
  SVG,
  Text,
} from '@metafam/ds';
// import { animated, config, useSpring } from '@react-spring/web';
import BubbleLg from 'assets/landing/pretty/bubble-large.svg';
import BubbleSm from 'assets/landing/pretty/bubble-small.svg';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import { FullPageContainer } from 'components/Container';
import { useEffect, useState } from 'react';

import { upDownAnimation, upDownAnimationLong } from './animations';

export const Intro: React.FC<{ currentSection: number }> = ({
  currentSection,
}) => {
  // const router = useRouter();
  const [onScreen, setOnScreen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  // const slideStyles = useSpring({
  //   config: config.stiff,
  //   from: { transform: `translate3d(0, ${300}px, 0)` },
  //   to: {
  //     transform: `translate3d(0, ${showQuote ? -50 : 300}px, 0)`
  //   }
  // })

  // const handleSectionNav = useCallback(
  //   (sectionId: string) => {
  //     router.push(`#${sectionId}`);
  //   },
  //   [router],
  // );

  const handleScrollHover = () => {
    setShowQuote(!showQuote);
    return null;
  };

  useEffect(() => {
    setTimeout(() => setOnScreen(currentSection === 0), 500);
  }, [currentSection]);

  return (
    <FullPageContainer
      id="start"
      bgImageUrl={BackgroundImage}
      backgroundPosition="top"
      // backgroundSize="cover"
      // backgroundBlendMode="screen"
      // mixBlendMode="screen"
      spacing={{ base: 8, xl: 20 }}
      justify="flex-end"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', xl: '7xl', '2xl': 'full' }}
        height="100%"
        alignItems="flex-start"
        justifyContent="center"
        pt={{ base: 0, xl: 14 }}
      >
        <Stack
          pos="relative"
          align="flex-start"
          justify="center"
          spacing={0}
          pb={10}
          direction={{ base: 'column', lg: 'column' }}
          maxW={{ base: 'full', xl: '2xl' }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? 0 : '3rem'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Heading
            as="h1"
            fontFamily="landingHeading"
            textTransform="uppercase"
            className="gradient"
            fontSize={{ base: 'md', lg: 'lg' }}
            fontWeight={100}
            my={0}
            textAlign="center"
            sx={{
              strong: {
                fontWeight: 300,
              },
            }}
          >
            <Text as="strong">A</Text> Massive{' '}
            <Text as="strong">Online Coordination</Text> Game
          </Heading>
        </Stack>
        <ScrollLink showQuote={showQuote} />
        <QuoteLayer
          quote="You never change things by fighting the existing reality. To change something, build a new model that  makes the existing model obsolete."
          attr="Buckminster Fuller"
          showQuote={showQuote}
          handleScrollHover={handleScrollHover}
        />
      </Container>
    </FullPageContainer>
  );
};

export const ScrollLink = ({ showQuote }: { showQuote: boolean }) => (
  <Box
    fontFamily="landingHeading"
    position="absolute"
    bottom={0}
    width="100%"
    textAlign="center"
    fontWeight={300}
    sx={{
      transition: 'all 0.3s 0.2s ease-in-out',
      transform: `translate3d(0, ${showQuote ? -235 : 0}px, 0)`,
      opacity: showQuote ? 0.3 : 1,
    }}
  >
    <Box
      d="flex"
      flexFlow="column wrap"
      sx={{
        button: {
          border: `1px solid ${'white'}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '35px',
          height: '35px',
          maxW: '35px',
          maxH: '35px',
          mx: 'auto',
        },
      }}
    >
      <Text as="span" fontSize="xs" pb={3}>
        Scroll Down
      </Text>
      <Button colorScheme="ghost">
        <ChevronDownIcon />
      </Button>
      <Box
        as="span"
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '1px',
          height: '50px',
          mx: 'auto',
        }}
      ></Box>
    </Box>
  </Box>
);

export const QuoteLayer = ({
  quote,
  attr,
  showQuote,
  handleScrollHover,
}: {
  quote: string;
  attr: string;
  showQuote: boolean;
  handleScrollHover: () => null;
}) => (
  <Box
    className="quote-layer"
    position="fixed"
    bottom={0}
    width="100vw"
    textAlign="center"
    onMouseEnter={handleScrollHover}
    onMouseLeave={handleScrollHover}
    transition="all 0.3s 0.2s ease-in-out"
  >
    <Box
      className="bubbles"
      position="absolute"
      bottom={0}
      left={0}
      minW="100vw"
      height="100%"
      pointerEvents="none"
      transition="transform 0.3s 0.3s ease-in-out"
      transform={`translate3d(0, ${showQuote ? -50 : 300}px, 0)`}
      sx={{
        img: {
          position: 'absolute',
          opacity: showQuote ? 1 : 0,
          transition: 'opacity 0.3s 0.3s ease-in-out',
        },
      }}
    >
      <Image src={BubbleSm} top="60%" left="10%" animation={upDownAnimation} />
      <Image
        src={BubbleLg}
        top="3%"
        left="20%"
        animation={upDownAnimationLong}
      />
      <Image src={BubbleSm} top="30%" right="25%" animation={upDownAnimation} />
      <Image
        src={BubbleLg}
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
      transition="transform 0.3s 0.2s ease-in-out, opacity 0.2s 0.4s ease-in"
      transform={`translate3d(0, ${showQuote ? -50 : 300}px, 0)`}
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
        fontSize="3xl"
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
