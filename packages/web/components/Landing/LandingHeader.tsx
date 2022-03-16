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
        w="100%"
        top={0}
        left={0}
        zIndex={300}
      >
        <Flex
          h={14}
          p={{ base: 4, md: 8 }}
          mx="auto"
          align="center"
          justify="space-between"
          w="100%"
        >
          <HStack
            spacing={8}
            align="center"
            opacity={toggle ? 1 : 0}
            transition="opacity 0.3s 0.6s ease"
            zIndex={toggle ? 600 : 0}
          >
            <NavLink
              key="link-home-logo"
              target="start"
              toggle={toggle}
              setToggle={setToggle}
            >
              <HStack
                fontFamily="body"
                fontSize="md"
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
            </NavLink>
          </HStack>

          <Button
            onClick={() => setToggle(!toggle)}
            sx={{
              alignSelf: 'center',
              justifySelf: 'right',
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: ['1.5rem', '1.5rem', '2rem'],
              height: ['1.5rem', '1.5rem', '2rem'],
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
                width: ['1.5rem', '1.5rem', '2rem'],
                height: ['0.08rem', '0.1rem', '0.2rem'],
                borderRadius: ['5px', '5px', '10px'],
                transition: 'all 0.3s linear',
                position: 'relative',
                transformOrigin: '1px',
                opacity: toggle ? 0.7 : 0.8,
                '&:first-of-type': {
                  transform: toggle
                    ? 'rotate(45deg) translate3d(2px, -1px, 0)'
                    : 'rotate(0)',
                },
                '&:nth-of-type(2)': {
                  opacity: toggle ? '0' : '0.6',
                  transform: toggle
                    ? 'translate3d(-20px, 0, 0)'
                    : 'translate3d(0, 0, 0)',
                },
                '&:nth-of-type(3)': {
                  transform: toggle
                    ? 'rotate(-45deg) translate3d(-1px, -1px, 0)'
                    : 'rotate(0)',
                },
              },
              'path, circle': {
                fill: toggle ? 'landing600' : 'landing250',
                transition: 'all 0.2s 0.2s ease',
              },
            }}
          >
            <MenuIconSVG />
            <MenuIconSVG />
            <MenuIconSVG />
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
              target="a-revolution"
              toggle={toggle}
              setToggle={setToggle}
            >
              4. A revolution!?
            </NavLink>
            <NavLink
              target="the-wild-web"
              toggle={toggle}
              setToggle={setToggle}
            >
              5. The Wild Web
            </NavLink>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <NavLink
              target="human-coordination"
              toggle={toggle}
              setToggle={setToggle}
            >
              6. Human Coordination
            </NavLink>
            <NavLink target="what-we-do" toggle={toggle} setToggle={setToggle}>
              7. Wot do ser?
            </NavLink>
            <NavLink target="play-life" toggle={toggle} setToggle={setToggle}>
              8. Play Life
            </NavLink>
            <NavLink target="for-who" toggle={toggle} setToggle={setToggle}>
              9. For who?
            </NavLink>
            <NavLink target="join-us" toggle={toggle} setToggle={setToggle}>
              10. Join us!
            </NavLink>
          </VStack>
        </Stack>
        <AnimatedWaves animationName={upDownAnimation} playing={toggle} />
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
