import {
  Box,
  BoxedNextImage,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from '@metafam/ds';
import MetaGameLogo from 'assets/logo-new.png';
import { SetStateAction } from 'jotai';
import { Dispatch, ReactNode, useState } from 'react';

import { AnimatedWaves, upDownAnimation } from './animations';

export const LandingHeader: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {/* // Header wrapper */}
      <Box
        as="header"
        pos="absolute"
        textAlign="center"
        w="100%"
        py={2}
        top={0}
        zIndex={300}
        sx={{
          backgroundColor: 'transparent',
        }}
      >
        <Flex
          h={14}
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
          w={{ base: '95%', md: '7xl', '2xl': '90%' }}
        >
          {/* // Header logo */}
          <HStack
            spacing={8}
            alignItems="center"
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
                  width="35px"
                  height="39px"
                />
                <Box as="span">MetaGame</Box>
              </HStack>
            </NavLink>
          </HStack>

          {/* // Header toggle button (mobile) */}
          <Button
            className="menu__toggle-button"
            onClick={() => setToggle(!toggle)}
            sx={{
              display: [`flex`, `flex`, `flex`],
              alignSelf: `center`,
              justifySelf: `right`,
              position: `relative`,
              flexDirection: `column`,
              justifyContent: `space-around`,
              width: [`1.5rem`, `1.5rem`, `2rem`],
              height: [`1.5rem`, `1.5rem`, `2rem`],
              background: `transparent`,
              border: `none`,
              cursor: `pointer`,
              padding: 0,
              marginRight: 0,
              zIndex: 401,
              overflow: `hidden`,
              '&:hover, &:focus,  &[data-hover]': {
                outline: `none`,
                background: 'transparent',
                boxShadow: 'none',
              },
              div: {
                width: [`1.5rem`, `1.5rem`, `2rem`],
                height: [`0.08rem`, `0.1rem`, `0.2rem`],
                backgroundColor: toggle ? `transparent` : `transparent`,
                borderRadius: [`5px`, `5px`, `10px`],
                transition: `all 0.3s linear`,
                position: `relative`,
                transformOrigin: `1px`,
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
                fill: toggle ? `landing600` : `landing250`,
                transition: `all 0.2s 0.2s ease`,
              },
            }}
          >
            <div>
              <MenuIconSVG />
            </div>
            <div>
              <MenuIconSVG />
            </div>
            <div>
              <MenuIconSVG />
            </div>
          </Button>
        </Flex>
      </Box>
      <Container
        className="menu--mobile"
        d="flex"
        flexFlow="column wrap"
        position="fixed"
        top={0}
        left={0}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100%"
        maxW="full"
        overflowY="hidden"
        zIndex={200}
        sx={{
          opacity: toggle ? 1 : 0,
          transform: toggle
            ? `translate3d(0, 0, 0)`
            : `translate3d(0, -120%, 0)`,
          transition: `transform 0.2s ease-in-out, opacity 0.2s 0.1s ease-in-out`,
          backgroundColor: 'landingDarkGlass',
          backdropFilter: 'blur(7px)',
          '.waveA, .waveB': {
            animationPlayState: 'paused',
          },
        }}
      >
        <HStack
          spacing={{ base: 4, '2xl': 10 }}
          textAlign="left"
          sx={{
            '.menu--mobile__menu-items': {
              span: {
                color: '#DD5FED',
              },
            },
          }}
        >
          <VStack
            className="menu--mobile__menu-items"
            d={{ base: 'flex' }}
            fontSize="lg"
            spacing={4}
            alignItems="flex-start"
            // mb={{ base: 16 }}
            opacity={toggle ? 1 : 0}
            transition="opacity 0.3s 0.5s ease-in-out"
            sx={{
              a: {
                textAlign: 'center',
              },
            }}
          >
            <NavLink target="start" toggle={toggle} setToggle={setToggle}>
              <Text as="span">1.</Text> Start here
            </NavLink>
            <NavLink
              target="wtf-is-a-metagame"
              toggle={toggle}
              setToggle={setToggle}
            >
              <Text as="span">2.</Text> What is a Metagame?
            </NavLink>
            <NavLink
              target="build-the-future"
              toggle={toggle}
              setToggle={setToggle}
            >
              <Text as="span">3.</Text> Build the future!
            </NavLink>
            <NavLink
              target="a-revolution"
              toggle={toggle}
              setToggle={setToggle}
            >
              <Text as="span">4.</Text> A revolution!?
            </NavLink>
            <NavLink
              target="the-wild-web"
              toggle={toggle}
              setToggle={setToggle}
            >
              <Text as="span">5.</Text> The Wild Web
            </NavLink>
          </VStack>
          <VStack
            className="menu--mobile__menu-items"
            d={{ base: 'flex' }}
            fontSize="lg"
            spacing={4}
            alignItems="flex-start"
            // mb={{ base: 16 }}
            opacity={toggle ? 1 : 0}
            transition="opacity 0.3s 0.5s ease-in-out"
          >
            <NavLink
              target="human-coordination"
              toggle={toggle}
              setToggle={setToggle}
            >
              <Text as="span">6.</Text> Human Coordination
            </NavLink>
            <NavLink target="what-we-do" toggle={toggle} setToggle={setToggle}>
              <Text as="span">7.</Text> Wot do ser?
            </NavLink>
            <NavLink target="play-life" toggle={toggle} setToggle={setToggle}>
              <Text as="span">8.</Text> Play Life
            </NavLink>
            <NavLink target="for-who" toggle={toggle} setToggle={setToggle}>
              <Text as="span">9.</Text> For who?
            </NavLink>
            <NavLink target="join-us" toggle={toggle} setToggle={setToggle}>
              <Text as="span">10.</Text> Join us!
            </NavLink>
          </VStack>
        </HStack>
        <AnimatedWaves animationName={upDownAnimation} playing={toggle} />
      </Container>
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
    _hover={{
      textDecoration: 'none',
    }}
    href={`#${target}`}
    onClick={() => setToggle(!toggle)}
    sx={{
      background: 'linear-gradient(90deg, #FFF -29.22%, #FFF 107.53%)',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      transition: 'backgroundImage 0.3s ease-in',
      '&.active, &:hover': {
        background: 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    }}
  >
    {children}
  </Link>
);

// type IconType = 'navToggle';

export const icons = {
  navToggle: {
    shape: (
      <>
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
      </>
    ),
    viewBox: `0 0 59 64`,
  },
  burstPucker: {
    shape: (
      <>
        <path
          d="M161 77.4448C129.42 80.2067 111.276 82.7477 100.137 91.144C87.0456 100.976 83.9451 118.984 80.5 155C76.9401 117.659 73.7247 99.7612 59.3702 90.1497C48.2311 82.6372 30.2019 80.2067 0 77.5552C31.4651 74.7933 49.724 72.2523 60.7482 63.9665C73.9544 54.0235 77.0549 36.1262 80.5 0C83.7154 33.2537 86.5863 51.0406 97.2661 61.315C107.946 71.5894 126.549 74.4619 161 77.4448Z"
          fill="#DC5EF1"
        />
      </>
    ),
    viewBox: '0 0 161 155',
  },
  burstSparkle: {
    shape: (
      <>
        <path
          d="M110 49.9644C92.7389 51.7463 82.8217 53.3856 76.7332 58.8026C69.5777 65.1461 67.883 76.7641 66 100C64.0542 75.9088 62.2967 64.3621 54.4508 58.1611C48.3623 53.3143 38.5078 51.7463 22 50.0356C39.1983 48.2537 49.1783 46.6144 55.204 41.2687C62.4223 34.8539 64.117 23.3072 66 0C67.7575 21.454 69.3267 32.9294 75.1641 39.5581C81.0014 46.1867 91.1698 48.0399 110 49.9644Z"
          fill="#FFC837"
        />
        <path
          d="M34 25.4847C27.331 26.2509 23.4993 26.9558 21.1469 29.2851C18.3823 32.0128 17.7275 37.0086 17 47C16.2482 36.6408 15.5692 31.6757 12.5378 29.0093C10.1854 26.9252 6.37803 26.2509 0 25.5153C6.64479 24.7491 10.5007 24.0442 12.8288 21.7455C15.6177 18.9872 16.2725 14.0221 17 4C17.679 13.2252 18.2853 18.1597 20.5407 21.01C22.796 23.8603 26.7247 24.6572 34 25.4847Z"
          fill="#FFC837"
        />
        <path
          d="M50 82.4847C43.331 83.2509 39.4993 83.9558 37.1469 86.2851C34.3823 89.0128 33.7275 94.0086 33 104C32.2482 93.6408 31.5692 88.6757 28.5378 86.0093C26.1854 83.9252 22.378 83.2509 16 82.5153C22.6448 81.7491 26.5007 81.0442 28.8288 78.7455C31.6177 75.9872 32.2725 71.0221 33 61C33.679 70.2252 34.2853 75.1597 36.5407 78.01C38.796 80.8603 42.7247 81.6572 50 82.4847Z"
          fill="#FFC837"
        />
      </>
    ),
    viewBox: '0 0 110 104',
  },
};

// type SVGProps = {
//   stroke?: string;
//   color?: string | number ;
//   width: string | number;
//   height: string | number;
//   icon: string | IconType;
//   left?: string | number;
//   right?: string | number;
//   top?: string | number;
//   bottom?: string | number;
//   strokeDashoffset?: number;
//   preserveAspectRatio?: string;
//   hiddenMobile?: boolean;
//   opacity?: number;
//   transform?: string;
//   fill?: string;
//   zIndex: number;
//   position?: string;
//   pointerEvents?: string;
// };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MenuIconSVG = () => (
  <Box
    as="svg"
    width={[`1.5rem`, `1.5rem`, `2rem`]}
    left="0"
    bottom="0"
    top={[0]}
    transform={`rotate(90deg)`}
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
);
