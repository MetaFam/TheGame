/* eslint-disable no-nested-ternary */
import {
  Box,
  BoxedNextImage,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  Tooltip,
  usePrefersReducedMotion,
  useToast,
  VStack,
} from '@metafam/ds';
import OctoBg from 'assets/baby_octo.webp';
import MetaGameLogo from 'assets/logo.webp';
import { MetaLink } from 'components/Link';
import { SetStateAction } from 'jotai';
import { get, set } from 'lib/store';
import React, {
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FaDiscord,
  FaGithub,
  FaHome,
  FaToggleOff,
  FaToggleOn,
  FaTrophy,
  FaTwitter,
  FaUserCircle,
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import { AnimatedWaves, upDownAnimation } from './animations';
import { LandingConnectButton } from './LandingConnectButton';
import { sections } from './landingSection';

export const LandingHeader: React.FC = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const savedMotionPreference = get('MotionPreference');
  const [noMotion, setNoMotion] = useState<boolean>(false);

  useEffect(() => {
    if (savedMotionPreference === 'off') {
      setNoMotion(true);
    } else if (savedMotionPreference === 'on') {
      setNoMotion(false);
    } else {
      setNoMotion(prefersReducedMotion);
    }
  }, [savedMotionPreference, prefersReducedMotion]);

  const reducedNoticeDismissed = get('ReducedMotionNotice') === 'dismissed';
  const root = typeof window !== 'undefined' ? document.body : null;
  const [effectsToggle, setEffectsToggle] = useState(noMotion);
  const toggleIcon = effectsToggle ? FaToggleOff : FaToggleOn;
  const [noticeOpen, setNoticeOpen] = useState(false);
  const toast = useToast();

  const handleCloseNotice = useCallback(() => {
    setNoticeOpen(false);
    set('ReducedMotionNotice', 'dismissed');
  }, []);

  const handleToggleEffects = useCallback(() => {
    set('MotionPreference', !noMotion ? 'off' : 'on');
    setNoMotion(!noMotion);
    setEffectsToggle(!effectsToggle);
    toast({
      title: `Motion ${noMotion ? 'enabled' : 'disabled'}`,
      description: `Toggle to turn effects & animations ${
        noMotion ? 'off' : 'on'
      }.`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  }, [effectsToggle, noMotion, toast]);

  /** set noMotion so we can turn off animations if preferred
   * Check for window to make sure we know window.matchMedia is available if supported
   */
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     if (noMotion && !reducedNoticeDismissed) {
  //       setNoticeOpen(true);
  //     } else {
  //       setNoticeOpen(false);
  //     }
  //   }
  // }, [noMotion, reducedNoticeDismissed]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia !== undefined) {
      if (noMotion) {
        root?.classList.add('no-motion');
        if (!reducedNoticeDismissed) {
          setNoticeOpen(true);
        }
      } else {
        root?.classList.remove('no-motion');
        setNoticeOpen(false);
      }
      setEffectsToggle(noMotion);
    }
  }, [noMotion, prefersReducedMotion, reducedNoticeDismissed, root]);

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
        zIndex={401}
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
              href="/#start"
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
          <HStack
            alignItems="center"
            alignContent="center"
            zIndex={401}
            pointerEvents="auto"
          >
            <Tooltip
              label={`Turn effects ${noMotion ? 'On' : 'Off'}`}
              hasArrow
              placement="bottom"
            >
              <Button
                onClick={handleToggleEffects}
                variant="ghost"
                display="inline-block"
                fontWeight="normal"
                color="white"
                borderRadius="inherit inherit 0 0"
                opacity={0.3}
                px={{ base: 1, xl: 2 }}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'var(--chakra-colors-landing300)',
                    opacity: 1,
                    svg: {
                      filter:
                        'drop-shadow(0 0 10px var(--chakra-colors-landing300))',
                    },
                  },
                }}
              >
                <Icon as={toggleIcon} h={{ base: 8, '2xl': 10 }} w="auto" />
              </Button>
            </Tooltip>

            <LandingConnectButton isIconStyle />
            <Button
              onClick={() => setMenuToggle(!menuToggle)}
              sx={{
                alignSelf: 'center',
                justifySelf: 'right',
                position: 'relative',
                flexDirection: 'column',
                justifyContent: 'space-around',
                w: { base: '2.25rem', xl: '2.5rem', '4xl': '3.1rem' },
                h: { base: '2.25rem', xl: '2.5rem', '4xl': '3.1rem' },
                borderRadius: { base: '0.25rem', xl: '1rem', '4xl': 'full' },
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginRight: 0,
                zIndex: 401,
                '&:hover, &:focus, &[data-hover]': {
                  outline: 'none',
                  background: 'transparent',
                  boxShadow: 'none',
                },
                '&:hover, &[data-hover]': {
                  svg: {
                    filter:
                      'drop-shadow(0 0 10px var(--chakra-colors-landing300))',
                  },
                  'path, circle': {
                    // fill: 'var(--chakra-colors-landing300)',
                    stroke: 'var(--chakra-colors-landing300)',
                  },
                },
                div: {
                  w: '99%',
                  h: '99%',
                  borderRadius: { base: '0.25rem', xl: '1rem', '4xl': 'full' },
                  transition: 'all 0.2s linear',
                  position: 'relative',
                  transformOrigin: '1px',
                },
                'path, circle': {
                  fill: menuToggle ? 'transparent' : 'transparent',
                  transition: noMotion ? 'none' : 'all 0.2s ease',
                  stroke: menuToggle ? 'landing600' : 'white',
                },
                '.top-line': {
                  transition: noMotion ? 'none' : 'all 0.6s ease',
                  transform: menuToggle
                    ? 'rotate(-405deg) translate3d(1px, 3px, 0)'
                    : 'rotate(0)',
                  transformOrigin: 'center',
                },
                '.bottom-line': {
                  transition: noMotion ? 'none' : 'all 0.6s ease',
                  transform: menuToggle
                    ? 'rotate(405deg) translate3d(0px, -4px, 0)'
                    : noMotion
                    ? 'none'
                    : 'rotate(0)',
                  transformOrigin: 'center',
                },
              }}
            >
              <MenuIcon2SVG toggle={menuToggle} />
            </Button>
          </HStack>
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
          opacity: menuToggle ? 1 : 0,
          transform: menuToggle
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, -120%, 0)',
          transition: noMotion
            ? 'none'
            : 'transform 0.2s ease-in-out, opacity 0.2s 0.1s ease-in-out',
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
          opacity={menuToggle ? 1 : 0}
          transition={noMotion ? 'none' : 'opacity 0.3s 0.5s ease-in-out'}
          fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
          zIndex={2}
        >
          <VStack spacing={4} alignItems="flex-start">
            {sections.map((section, index) => (
              <NavLink
                key={index}
                target={section.internalLinkId}
                toggle={menuToggle}
                setToggle={setMenuToggle}
              >
                {section.title}
              </NavLink>
            ))}
          </VStack>
          <HStack
            display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }}
            justifyContent={'space-around'}
            flexDirection={'row'}
            sx={{
              opacity: 0.7,
              transition: 'opacity 0.2s 0.2s ease',
              '&:hover': { opacity: 0.8 },
              a: {
                color: 'white',
                fontSize: { base: 'md', lg: '2xl' },
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  filter: 'drop-shadow(0 0 30px #333)',
                },
              },
            }}
          >
            <MetaLink href="https://github.com/metafam" my={3} isExternal>
              <Tooltip label="Github" hasArrow placement="right">
                <Box as="span">
                  <FaGithub />
                </Box>
              </Tooltip>
            </MetaLink>
            <MetaLink href="https://chat.metagame.wtf" isExternal>
              <Tooltip label="Discord" hasArrow placement="right">
                <Box as="span">
                  <FaDiscord />
                </Box>
              </Tooltip>
            </MetaLink>
            <MetaLink href="https://twitter.com/metafam" isExternal>
              <Tooltip label="Twitter" hasArrow placement="right">
                <Box as="span">
                  <FaTwitter />
                </Box>
              </Tooltip>
            </MetaLink>
            <MetaLink href="/players">
              <Tooltip label="Leaderboard" hasArrow placement="right">
                <Box as="span">
                  <FaTrophy />
                </Box>
              </Tooltip>
            </MetaLink>
            <MetaLink href="/dashboard">
              <Tooltip label="Dashboard" hasArrow placement="right">
                <Box as="span">
                  <FaHome />
                </Box>
              </Tooltip>
            </MetaLink>
            <MetaLink href="/me">
              <Tooltip label="Player Profile" hasArrow placement="right">
                <Box as="span">
                  <FaUserCircle />
                </Box>
              </Tooltip>
            </MetaLink>
          </HStack>
        </Stack>
        <AnimatedWaves
          animationName={upDownAnimation}
          playing={noMotion ? false : menuToggle}
        />
        <Box
          position="absolute"
          bottom={{ base: 3, xl: '0%' }}
          left={-2}
          w="100%"
          h="25%"
          bgImage={OctoBg.src}
          backgroundSize={{ base: '30%', md: '20%', xl: '10%', '4xl': '8%' }}
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          opacity={0.5}
          pointerEvents="none"
          zIndex={200}
          sx={{
            animation: noMotion ? 'none' : upDownAnimation,
            animationPlayState: menuToggle ? 'playing' : 'paused',
            animationDuration: '5s',
            filter: 'drop-shadow(0 0 20px #000)',
            opacity: menuToggle ? 1 : noMotion ? 1 : 0,
            transition: 'opacity 0.3s 0.2s ease-in-out',
          }}
        />
      </Flex>

      <Box
        position="fixed"
        top={0}
        left={0}
        width="full"
        alignItems="center"
        justifyContent="center"
        flexFlow="row nowrap"
        py={1}
        textAlign="center"
        display={!noticeOpen ? 'none' : 'flex'}
        backgroundColor="silver"
        dropShadow={`0 0 10px black`}
        color="dark"
        zIndex={500}
      >
        <Text fontSize={{ base: 'xs', '2xl': 'sm' }}>
          Anon, I noticed that you prefer reduced motion on websites &amp; apps,
          so disabled all unnecessary effects / animations for you. Hover on
          links &amp; buttons remain. Love, Nova{' '}
          <span
            title="Nova. See The Lore of MetaGame"
            role="img"
            className="gradient-text"
          >
            🐙
          </span>{' '}
        </Text>
        <IconButton
          icon={<MdClose />}
          onClick={handleCloseNotice}
          aria-label="close motion notice"
          variant="ghost"
          width={6}
          height={6}
          sx={{
            '&:hover': {
              color: 'var(--chakra-colors-landing500)',
              backgroundColor: 'transparent',
            },
          }}
        />
      </Box>
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
    href={`/#${target}`}
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
      ml={0}
      mt={0}
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
