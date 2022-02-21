import {
  BoxedNextImage,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from '@metafam/ds';
// import { animated } from '@react-spring/web';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import MetaGameLogo from 'assets/logo-new.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Intro: React.FC = () => (
  <FullPageContainer
    id="section-1"
    bgImageUrl={BackgroundImage}
    spacing={8}
    justify="flex-end"
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
        // '&:hover': {
        //   '.gradient': {
        //     animation: `${gradientShift} 2s infinite`,
        //   },
        // },
      },
      '.gradient': {
        background: 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
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
    {/* <Box
      pos="absolute"
      top={0}
      left={0}
      backgroundImage={`url(${BackgroundImage})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      height="100%"
      width="100%"
      zIndex={0}
    /> */}
    <Container
      d="flex"
      maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
      height="100%"
      alignItems="flex-end"
      justifyContent="center"
    >
      <IntroHero />
    </Container>
  </FullPageContainer>
);

export const IntroHero: React.FC = () => {
  const { push } = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(heroRef);

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Stack
      ref={heroRef}
      pos="relative"
      align="center"
      justify="left"
      spacing={{ base: 8, lg: 10 }}
      py={{ base: 10, lg: 20 }}
      direction={{ base: 'column', lg: 'column' }}
      maxW="lg"
      zIndex={100}
      transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
      opacity={onScreen ? 1 : 0}
      transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
    >
      <Heading
        as="h1"
        fontFamily="body"
        fontSize={{ base: '5xl', md: '7xl' }}
        fontWeight="300"
        color="white"
      >
        <HStack spacing={2} alignItems="center" justifyContent="flex-start">
          <BoxedNextImage
            src={MetaGameLogo}
            alt="MetaGame Logo"
            width="105px"
            height="117px"
          />
          <Text as="span">MetaGame</Text>
        </HStack>
      </Heading>

      <Text as="p" className="gradient" fontSize={{ base: 'md', '2xl': '3xl' }}>
        A Massive Online Coordination Game
      </Text>
      {/* <Text as="p">
          By coordinating with others on building a better world; doing things
          that create <Text as="span">a positive impact</Text>, make{' '}
          <Text as="span">you happy</Text>, and{' '}
          <Text as="span">earn you money</Text>.
        </Text> */}

      <Stack
        pt={{ base: 0, xl: 0 }}
        spacing={{ base: 4, sm: 6 }}
        direction={{ base: 'column', sm: 'row' }}
        transform={`translate3d(0, ${onScreen ? '0' : '20vh'}, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.6s ease-in-out, opacity 0.5s 0.7s ease-in"
      >
        {/* <Button className="border-grad" rounded="md" size="lg">
          <Text as="span">Join now</Text>
        </Button> */}
        <Button
          className="border-grad"
          colorScheme="white"
          size="lg"
          leftIcon={<BsArrowDown />}
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('section-2')}
        >
          <Text as="span">Explore more</Text>
        </Button>
      </Stack>
    </Stack>
  );
};

// const AnimatedIntroHero = animated(IntroHero);
