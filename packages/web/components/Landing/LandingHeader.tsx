import {
  Box,
  BoxedNextImage,
  Button,
  Flex,
  HStack,
  Link,
  Stack,
  VStack,
} from '@metafam/ds';
import MetaGameLogo from 'assets/logo.png';
import OctoBg from 'assets/octopus.png';
import { MetaLink } from 'components/Link';
import { SetStateAction } from 'jotai';
import { Dispatch, ReactNode, useState } from 'react';

import { AnimatedWaves, upDownAnimation, wavesAnimation } from './animations';

export const LandingHeader: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Box
        as="header"
        pos="fixed"
        textAlign="center"
        px={{ base: 1, lg: 14 }}
        w="100%"
        top={{ base: 5, '2xl': 10 }}
        left={0}
        zIndex={300}
      >
        <Flex
          h={10}
          minH={10}
          p={{ base: 4, md: 0 }}
          mx="auto"
          align="center"
          justify="space-between"
          w="100%"
          maxW={{ base: 'full' }}
          // border="1px solid red"
        >
          <HStack
            spacing={8}
            align="center"
            // opacity={toggle ? 1 : 0}
            transition="opacity 0.3s 0.6s ease"
            // zIndex={toggle ? 600 : 0}
          >
            <MetaLink
              key="link-home-logo"
              href="#start"
              color="white"
              // toggle={toggle}
              // setToggle={setToggle}
            >
              <HStack
                fontFamily="body"
                fontSize="lg"
                fontWeight={400}
                spacing={2}
                alignItems="center"
                justifyContent="flex-start"
              >
                <BoxedNextImage
                  src={MetaGameLogo}
                  alt="MetaGame Logo"
                  width="2.25rem"
                  height="2.5rem"
                />
                <Box as="span">MetaGame</Box>
              </HStack>
            </MetaLink>
          </HStack>

          <Button
            onClick={() => setToggle(!toggle)}
            sx={{
              alignSelf: 'center',
              justifySelf: 'right',
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: ['2.5rem'],
              height: ['2.5rem'],
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginRight: 0,
              zIndex: 401,
              overflow: 'hidden',
              '&:hover, &:focus,  &[data-hover]': {
                outline: 'none',
                background: 'transparent',
                boxShadow: 'none',
              },
              div: {
                width: ['2.5rem'],
                // height: ['0.08rem', '0.1rem', '0.2rem'],
                borderRadius: ['5px', '5px', '10px'],
                transition: 'all 0.3s linear',
                position: 'relative',
                transformOrigin: '1px',
              },
              'path, circle': {
                fill: toggle ? 'transparent' : 'transparent',
                transition: 'all 0.2s 0.2s ease',
                stroke: toggle ? 'landing600' : 'white',
              },
              '.top-line': {
                transition: 'all 0.6s ease',
                transform: toggle
                  ? 'rotate(-405deg) translate3d(1px, 3px, 0)'
                  : 'rotate(0)',
                transformOrigin: 'center',
              },
              '.bottom-line': {
                transition: 'all 0.6s ease',
                transform: toggle
                  ? 'rotate(405deg) translate3d(0px, -4px, 0)'
                  : 'rotate(0)',
                transformOrigin: 'center',
              },
            }}
          >
            <MenuIcon2SVG toggle={toggle} />
          </Button>
        </Flex>
      </Box>
      <Flex
        flexFlow="column wrap"
        position="fixed"
        top={0}
        left={0}
        align="center"
        justify="center"
        height="100%"
        width="100%"
        overflow="hidden"
        zIndex={200}
        sx={{
          opacity: toggle ? 1 : 0,
          transform: toggle
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, -120%, 0)',
          transition:
            'transform 0.2s ease-in-out, opacity 0.2s 0.1s ease-in-out',
          backgroundColor: 'landingDarkGlass',
          backdropFilter: 'blur(7px)',
          '.waveA, .waveB': {
            animationPlayState: 'paused',
          },
        }}
      >
        <Stack
          spacing={4}
          direction={{ base: 'column', md: 'row' }}
          opacity={toggle ? 1 : 0}
          transition="opacity 0.3s 0.5s ease-in-out"
          fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
          zIndex={2}
        >
          <VStack spacing={4} alignItems="flex-start">
            <NavLink target="start" toggle={toggle} setToggle={setToggle}>
              1. Start here
            </NavLink>
            <NavLink
              target="wtf-is-a-metagame"
              toggle={toggle}
              setToggle={setToggle}
            >
              2. What is a Metagame?
            </NavLink>
            <NavLink
              target="build-the-future"
              toggle={toggle}
              setToggle={setToggle}
            >
              3. Build the future!
            </NavLink>
            <NavLink
              target="the-wild-web"
              toggle={toggle}
              setToggle={setToggle}
            >
              4. The Wild Web
            </NavLink>
            <NavLink target="what-do" toggle={toggle} setToggle={setToggle}>
              5. What do?
            </NavLink>

            <NavLink target="join-us" toggle={toggle} setToggle={setToggle}>
              6. Join us!
            </NavLink>
          </VStack>
        </Stack>
        <AnimatedWaves animationName={upDownAnimation} playing={toggle} />
        <Box
          position="absolute"
          top="20%"
          left={-2}
          width="100vw"
          height="100vh"
          bgImage={OctoBg}
          backgroundSize={{ base: '70%', xl: '20%' }}
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          opacity={0.5}
          pointerEvents="none"
          zIndex={200}
          sx={{
            animation: upDownAnimation,
            animationPlayState: toggle ? 'playing' : 'paused',
            filter: 'drop-shadow(0 0 20px #000)',
            opacity: toggle ? 1 : 0,
            transform: toggle
              ? 'translate3d(0, 50%, 0)'
              : 'translate3d(0, 80%, 0)',
            transition:
              'transform 0.5s 0.3s ease-in-out, opacity 0.3s 0.4s ease-in-out',
          }}
        />
      </Flex>
    </>
  );
};

const NavLink = ({
  children,
  target,
  toggle,
  setToggle,
}: {
  children: ReactNode;
  target: string;
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}) => (
  <Link
    px={2}
    py={1}
    href={`#${target}`}
    onClick={() => setToggle(!toggle)}
    textAlign="center"
    sx={{
      background: 'linear-gradient(90deg, #FFF -29.22%, #FFF 107.53%)',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      transition: 'backgroundImage 0.3s ease-in',
      '&.active, &:hover': {
        background: 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textDecor: 'none',
      },
    }}
  >
    {children}
  </Link>
);

export const MenuIconSVG: React.FC = () => (
  <Box>
    <Box
      as="svg"
      width={['1.5rem', '1.5rem', '2rem']}
      left={0}
      bottom={0}
      top={0}
      transform="rotate(90deg)"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 59 64"
    >
      <path
        d="M3.42182 56.6965C5.3095 56.6965 6.84131 58.2283 6.84131 60.116C6.84131 62.0059 5.3095 63.5355 3.42182 63.5355C1.53414 63.5355 0.00232906 62.0059 0.00232899 60.116C0.00232893 58.2283 1.53414 56.6965 3.42182 56.6965Z"
        fill="white"
      />
      <path
        d="M3.42182 28.5828C5.3095 28.5828 6.84131 30.1124 6.84131 32.0023C6.84131 33.8899 5.3095 35.4218 3.42182 35.4218C1.53414 35.4218 0.00232906 33.8899 0.00232899 32.0023C0.00232893 30.1124 1.53414 28.5828 3.42182 28.5828Z"
        fill="white"
      />
      <path
        d="M3.41961 0.468262C5.3095 0.468262 6.84131 2.00007 6.84131 3.88776C6.84131 5.77544 5.3095 7.30726 3.41961 7.30726C1.53193 7.30726 0.00011749 5.77545 0.000117423 3.88776C0.000117356 2.00007 1.53193 0.468262 3.41961 0.468262Z"
        fill="white"
      />
    </Box>
  </Box>
);

export const MenuIcon2SVG = ({ toggle }: { toggle: boolean }) => (
  <Box>
    <Box
      as="svg"
      width={['2.5rem']}
      left={0}
      bottom={0}
      top={0}
      transition="transform 0.5s ease"
      transform={toggle ? 'rotate(-90deg)' : 'rotate(0)'}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 48 48"
    >
      <path
        d="M46.8937 23.64C46.8937 36.4827 36.4827 46.8937 23.64 46.8937C10.7973 46.8937 0.386262 36.4827 0.386262 23.64C0.386262 10.7973 10.7973 0.386262 23.64 0.386262C36.4827 0.386262 46.8937 10.7973 46.8937 23.64Z"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="0.772524"
      />
      <path
        d="M32.6262 20.7609L13.8833 20.7612"
        className="top-line"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={
          toggle
            ? 'M32.6258 27.5447L13.8835 27.5447'
            : 'M26.7258 27.5447L13.8835 27.5447'
        }
        className="bottom-line"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  </Box>
);
