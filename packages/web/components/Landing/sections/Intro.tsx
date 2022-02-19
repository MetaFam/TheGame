import {
  Box,
  Button,
  Container,
  Heading,
  keyframes,
  Stack,
  Text,
} from '@metafam/ds';
import { animated, useSpring } from '@react-spring/web';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const gradientShift = keyframes`
  0% {
    background-position: -254%;
  }
  50% {
    background-position: -354%;
  }
  100% {
    background-position: -254%;
  }
`;

export const Intro: React.FC = () => {
  const { push } = useRouter();

  return (
    <Container
      id="section__intro"
      pos="relative"
      width="100vw"
      height={'100vh'}
      minHeight="100%"
      maxHeight="100vh"
      maxW="full"
      // px={8}
      zIndex={0}
      sx={{
        h2: {
          '& > .gradient': {
            background:
              'conic-gradient(from 92.2deg at 53.45% 74.83%, #8EBBFF 0deg, #DE3FFF 88.12deg, #79F8FB 105deg, #7C56FF 165deg, #FF61E6 251.25deg, #927CFF 286.87deg, #76EBF2 326.25deg, #8EBBFF 360deg)',
            backgroundPosition: '-254%',
            backgroundSize: '133%',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitTextFillColor: 'transparent',
            transition: 'background 0.3s ease',
          },
          '&:hover': {
            '.gradient': {
              animation: `${gradientShift} 2s infinite`,
            },
          },
        },
        'p > span': {
          background:
            'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.border-grad': {
          border: '1px double transparent',
          background: 'transparent',
          backgroundImage:
            'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'border-box',
          WebkitBackgroundOrigin: 'border-box',
          boxSizing: 'border-box',
          '& > span': {
            background:
              'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s ease',
          },
          '&:hover': {
            backgroundImage:
              'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundSize: '130%',
            '& > span': {
              background:
                'linear-gradient(-90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          },
        },
      }}
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        backgroundImage={`url(${BackgroundImage})`}
        bgPosition="bottom right"
        bgRepeat="no-repeat"
        bgSize="contain"
        height="100%"
        width="100%"
        zIndex={0}
      />
      <Container maxW="8xl">
        <AnimatedIntroHero />
      </Container>
    </Container>
  );
};

// type IntroHeroProps = {
//   isDisplayed: boolean;
// }

export const IntroHero = () => {
  const { push } = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(heroRef, '100px');
  const heroProps = useSpring({
    opacity: onScreen ? 1 : 0,
  });

  useEffect(() => {
    if (onScreen) {
      console.log('hero onscreen');
    } else {
      console.log('hero offscreen');
    }
  }, [onScreen]);

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Stack
      ref={heroRef}
      id="home"
      pos="relative"
      align="center"
      justify="left"
      spacing={{ base: 8, lg: 10 }}
      py={{ base: 20, lg: 28 }}
      direction={{ base: 'column', lg: 'row' }}
      maxW="lg"
      zIndex={100}
      transform={`translate3d(${onScreen ? '0' : '-20vw'}, 0, 0)`}
      opacity={onScreen ? 1 : 0}
      transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
    >
      <Stack flex={1} spacing={{ base: 5, lg: 10 }}>
        <Heading
          as="h2"
          fontFamily="landingHero"
          fontSize={{ base: '3rem', lg: '60px' }}
          fontWeight="700"
          color="landing250"
        >
          <Text as="span">To find your metagame means to</Text>{' '}
          <Text as="span" className="gradient">
            play life in an optimal way
          </Text>
        </Heading>
        <Text as="p">
          By coordinating with others on building a better world; doing things
          that create <Text as="span">a positive impact</Text>, make{' '}
          <Text as="span">you happy</Text>, and{' '}
          <Text as="span">earn you money</Text>.
        </Text>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Button className="border-grad" rounded="md" size="lg">
            <Text as="span">Join now</Text>
          </Button>
          <Button
            colorScheme="white"
            size="lg"
            rightIcon={<BsArrowRight />}
            onClick={() => handleSectionNav('section__game')}
          >
            Explore more
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const AnimatedIntroHero = animated(IntroHero);
