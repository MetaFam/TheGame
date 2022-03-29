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
import OctoBg from 'assets/baby_octo.png';
import MetaGameLogo from 'assets/logo.png';
import { MetaLink } from 'components/Link';
import { SetStateAction } from 'jotai';
import { Dispatch, ReactNode, useState } from 'react';

import { AnimatedWaves, upDownAnimation } from './animations';

export const LandingHeader: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Box
        as="header"
        pos="fixed"
        textAlign="center"
        px={{ base: 1, md: 8, lg: 14 }}
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
        >
          <HStack
            spacing={8}
            align="center"
            transition="opacity 0.3s 0.6s ease"
          >
            <MetaLink
              key="link-home-logo"
              href="#start"
              color="white"
              sx={{
                '&.active, &:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <HStack
                fontFamily="body"
                fontSize={{ base: 'md', xl: 'lg', '4xl': '2xl' }}
                fontWeight={400}
                spacing={2}
                alignItems="center"
                justifyContent="flex-start"
              >
                <BoxedNextImage
                  src={MetaGameLogo}
                  alt="MetaGame Logo"
                  w={{ base: '2rem', xl: '2.25rem', '4xl': '2.5rem' }}
                  h={{ base: '2.25rem', xl: '2.5rem', '4xl': '2.75rem' }}
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
              w: { base: '2.25rem', xl: '2.5rem', '4xl': '3.1rem' },
              h: { base: '2.25rem', xl: '2.5rem', '4xl': '3.1rem' },
              borderRadius: { base: '0.25rem', xl: '1rem', '4xl': '1.25rem' },
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginRight: 0,
              zIndex: 401,
              '&:hover, &:focus,  &[data-hover]': {
                outline: 'none',
                background: 'transparent',
                boxShadow: 'none',
              },
              div: {
                w: 'full',
                h: 'full',
                borderRadius: { base: '0.25rem', xl: '1rem', '4xl': '1.25rem' },
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
        right={{ base: 0 }}
        left={{ base: 0, xl: 'unset' }}
        align="center"
        justify="center"
        w={{ base: '100vw', xl: '100%' }}
        h="100%"
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
          bottom={{ base: 3, xl: '0%' }}
          left={-2}
          w="100%"
          h="25%"
          bgImage={OctoBg}
          backgroundSize={{ base: '30%', md: '20%', xl: '10%', '4xl': '8%' }}
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          opacity={0.5}
          pointerEvents="none"
          zIndex={200}
          sx={{
            animation: upDownAnimation,
            animationPlayState: toggle ? 'playing' : 'paused',
            animationDuration: '5s',
            filter: 'drop-shadow(0 0 20px #000)',
            opacity: toggle ? 1 : 0,
            transition: 'opacity 0.3s 0.2s ease-in-out',
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

export const MenuIcon2SVG = ({ toggle }: { toggle: boolean }) => (
  <Box>
    <Box
      as="svg"
      w={{ base: '2.25rem', xl: '2.5rem', '4xl': '2.9rem' }}
      position="absolute"
      ml={0.5}
      mt={0.5}
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
        strokeOpacity={0.9}
        strokeWidth={1}
      />
      <path
        d="M32.6262 20.7609L13.8833 20.7612"
        className="top-line"
        stroke="white"
        strokeWidth={1}
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
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  </Box>
);
