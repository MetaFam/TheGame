/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  useBreakpointValue,
  usePrefersReducedMotion,
  useToast,
  VStack,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { Build } from 'components/Landing/Build';
import { Game } from 'components/Landing/Game';
import { Intro } from 'components/Landing/Intro';
import { JoinUs } from 'components/Landing/JoinUs';
import { LandingHeader } from 'components/Landing/LandingHeader';
import { Onboard } from 'components/Landing/Onboard';
import { WhatDo } from 'components/Landing/WhatDo';
import { WhyAreWeHere } from 'components/Landing/WhyAreWeHere';
import { WildWeb } from 'components/Landing/WildWeb';
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
import { useWeb3 } from 'lib/hooks';
import { get, set } from 'lib/store';
// import { gsap } from "gsap";
// import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { MdClose } from 'react-icons/md';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const ArrowUp: React.FC = () => (
  <svg
    strokeWidth={0}
    viewBox="0 0 16 16"
    focusable="false"
    width="16"
    height="16"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#FF61E6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7C56FF', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#grad1)"
      fillRule="evenodd"
      d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
      clipRule="evenodd"
    />
    <path
      fill="url(#grad1)"
      fillRule="evenodd"
      d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z"
      clipRule="evenodd"
    />
  </svg>
);

const Landing: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const savedMotionPreference = get('MotionPreference');
  const [noMotion, setNoMotion] = useState(
    savedMotionPreference === 'off'
      ? true
      : savedMotionPreference === 'on'
      ? false
      : prefersReducedMotion,
  );
  const reducedNoticeDismissed = get('ReducedMotionNotice') === 'dismissed';
  const root = typeof window !== 'undefined' ? document.body : null;
  const [effectsToggle, setEffectsToggle] = useState(noMotion);
  const toggleIcon = effectsToggle ? FaToggleOff : FaToggleOn;
  const [noticeOpen, setNoticeOpen] = useState(false);
  const { connect, disconnect, connected, connecting } = useWeb3();
  const spinnerSize = useBreakpointValue({ base: 'sm', '2xl': 'md' });
  const toast = useToast();
  const scrollContainer =
    typeof document !== 'undefined'
      ? document.getElementById('scroll-container')
      : null;
  const [section, setSection] = useState(0);
  const hostName = useRef('https://metagame.wtf');
  const setHostName = useCallback((host) => {
    hostName.current = host;
  }, []);

  const handleCloseNotice = useCallback(() => {
    setNoticeOpen(false);
    set('ReducedMotionNotice', 'dismissed');
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollContainer) return;
    const { scrollTop } = scrollContainer;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1;
    setSection(Math.floor(scrollTop / height));
  }, [scrollContainer]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!scrollContainer) return;
      const { scrollTop, scrollHeight } = scrollContainer;
      const height = typeof window !== 'undefined' ? window.innerHeight : 1;
      let newScrollTop = scrollTop;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        newScrollTop -= height;
        newScrollTop = Math.max(0, newScrollTop);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        newScrollTop += height;
        newScrollTop = Math.min(scrollHeight, newScrollTop);
      }
      scrollContainer.scrollTop = newScrollTop;
      setSection(Math.floor(newScrollTop / height));
    },
    [scrollContainer],
  );

  /** TODO: Toggle works 100% except on first load when
   * the switch renders as 'on' but is actually 'off' if no motion pref is saved */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectsToggle, noMotion]);

  // eslint-disable-next-line no-promise-executor-return
  // const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  // const handleDisconnect = () => {
  //   disconnect();

  //   sleep(1000).then(() => {
  //     console.log('disconnected?');

  //     if (!connected) {
  //       toast({
  //         title: 'Wallet disconnected',
  //         description: 'Any local data has been removed. See you soon, Anon! 🐙',
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //       console.log('disconnected');
  //     }

  //   }).catch(() => {
  //     toast({
  //       title: 'Wallet disconnect',
  //       description: 'We couldn\'t disconnect your wallet. Please try again.',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   });
  // }

  /** Initially set the motion pref if it's not already set */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia !== undefined) {
      if (savedMotionPreference === null) {
        set('MotionPreference', prefersReducedMotion ? 'off' : 'on');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** set noMotion so we can turn off animations if preferred
   * Check for window to make sure we know window.matchMedia is availabe if supported
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // setNoMotion(prefersReducedMotion);
      if (noMotion && !reducedNoticeDismissed) {
        setNoticeOpen(true);
      } else {
        setNoticeOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollContainer?.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    document.querySelector('body')?.classList.add('landing');

    if (typeof window !== 'undefined') {
      setHostName(window.location.origin);
    }

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown, scrollContainer, section, setHostName]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia !== undefined) {
      if (noMotion) {
        root?.classList.add('no-motion');
        setNoMotion(true);
        if (!reducedNoticeDismissed) {
          setNoticeOpen(true);
        }
      } else {
        root?.classList.remove('no-motion');
        setNoMotion(false);
        setNoticeOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectsToggle, prefersReducedMotion]);

  return (
    <>
      <HeadComponent
        title="MetaGame: A Massive Online Coordination Game!"
        description="To play metagame is to play life in the optimal way. Coordinating with others to build a better world; make a positive impact, make you happy, &amp; earn you money."
        url={hostName.current}
        img={`${hostName.current}/assets/social.png`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <PageContainer p={0}>
        <Intro currentSection={section} /> {/* section 0 */}
        <Game /> {/* section 1 */}
        <Build /> {/* section 2 */}
        <WildWeb /> {/* section 3 */}
        <WhyAreWeHere /> {/* section 4 */}
        <WhatDo /> {/* section 5 */}
        <Onboard /> {/* section 6 */}
        <JoinUs /> {/* section 7 */}
      </PageContainer>
      <SectionWayPoints currentWaypoint={section} />
      <Socials />
      <MetaLink
        position="fixed"
        bottom={{ base: 20, md: 4 }}
        right={{ base: 0, md: 4 }}
        href="#start"
        opacity={section === 0 ? 0 : 1}
        transform={`translate3d(0,${section === 0 ? '30px' : '0px'},0)`}
        transition="transform 0.3s 0.3s ease-in-out, opacity 0.3s 0.3s ease-in-out"
        _hover={{ textDecor: 'none' }}
        zIndex={10}
      >
        <Button
          className="gradient-text"
          colorScheme="white"
          rightIcon={<ArrowUp />}
        >
          Back to top
        </Button>
      </MetaLink>
      <HStack
        alignItems="center"
        alignContent="center"
        position="absolute"
        bottom={{ base: 20, xl: 4 }}
        left={4}
        zIndex={199}
        pointerEvents="auto"
      >
        <Tooltip label={`Turn effects ${noMotion ? 'On' : 'Off'}`}>
          <Button
            onClick={handleToggleEffects}
            variant="ghost"
            display="inline-block"
            fontWeight="normal"
            color="var(--chakra-colors-diamond)"
            textShadow={`0 0 8px var(--chakra-colors-landing500)`}
            borderRadius="inherit inherit 0 0"
            opacity={0.5}
            px={2}
            sx={{
              svg: {
                filter: 'drop-shadow(0 0 10px var(--chakra-colors-diamond))',
              },
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

        <Tooltip label={`${connected ? 'Disconnect' : 'Connect'} wallet`}>
          <Button
            onClick={connected ? disconnect : connect}
            variant="ghost"
            display="inline-flex"
            alignItems="center"
            fontWeight="normal"
            color="var(--chakra-colors-diamond)"
            textShadow={`0 0 8px var(--chakra-colors-landing500)`}
            borderRadius="inherit inherit 0 0"
            opacity={0.5}
            px={2}
            sx={{
              svg: {
                filter: 'drop-shadow(0 0 10px var(--chakra-colors-diamond))',
              },
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
            {connecting ? (
              <Spinner size={spinnerSize} />
            ) : (
              <Icon
                as={connected ? GoSignOut : GoSignIn}
                h={{ base: 6, '2xl': 8 }}
                w={{ base: 6, '2xl': 8 }}
              />
            )}
          </Button>
        </Tooltip>
      </HStack>
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
        zIndex={100}
      >
        <Text fontSize="md">
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
export default Landing;

export const Socials: React.FC = () => (
  <Box
    className="metafam-socials"
    position="fixed"
    right={{ base: 5, md: 10, lg: 5 }}
    minW={5}
    height="100vh"
    minH="100vh"
    zIndex={400}
  >
    {/* {currentWaypoint !== 6 && ( */}
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      height="100%"
      // opacity={currentWaypoint === 4 ? 0 : 1}
      transition="transform 0.3s 0.1s ease, opacity 0.3s 0.3s ease"
      // transform={`translate3d(${currentWaypoint === 4 ? -200 : 0}px, 0, 0)`}
    >
      <VStack
        spacing={3}
        minW={5}
        zIndex={400}
        flexFlow="column-reverse"
        sx={{
          opacity: 0.3,
          transition: 'opacity 0.2s 0.2s ease',
          '&:hover': {
            opacity: 0.8,
          },
          a: {
            color: 'white',
            fontSize: { base: 'md', lg: '2xl' },
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
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
        <MetaLink href="https://discord.com/invite/metagame" isExternal>
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
      </VStack>
    </Box>
  </Box>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SectionWayPoints = ({
  currentWaypoint,
}: {
  currentWaypoint: number;
}) => {
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Box
      className="section-waypoints"
      position="fixed"
      left={{ base: 5, md: 10, lg: 5 }}
      minW={5}
      height="100vh"
      minH="100vh"
      zIndex={400}
    >
      {/* {currentWaypoint !== 6 && ( */}
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        height="100%"
        // opacity={currentWaypoint === 4 ? 0 : 1}
        transition="transform 0.3s 0.1s ease, opacity 0.3s 0.3s ease"
        // transform={`translate3d(${currentWaypoint === 4 ? -200 : 0}px, 0, 0)`}
      >
        <VStack
          spacing={2}
          minW={5}
          zIndex={400}
          sx={{
            button: {
              background: 'transparent',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              minW: '20px',
              maxH: '20px',
              p: 0,
              '& > span': {
                border: `1px solid rgba(255,255,255,0.0)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '10px',
                height: '10px',
                maxW: '10px',
                maxH: '10px',
                p: '10px',
                overflow: 'clip',
                textIndent: '-9999rem',
                transition: 'all 0.3s 0.2s ease-in-out',
                '&::after': {
                  content: '""',
                  display: 'block',
                  background: 'white',
                  borderRadius: '50%',
                  width: '5px',
                  height: '5px',
                  minW: '5px',
                  minH: '5px',
                },
              },
              '&.active': {
                '& > span': {
                  border: `1px solid  rgba(255,255,255,1)`,
                },
              },
            },
          }}
        >
          <Box fontSize="xs" fontWeight={200}>
            {`0${currentWaypoint + 1}`}
          </Box>
          <Button
            className={currentWaypoint === 0 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('start')}
          >
            <Text as="span">01</Text>
          </Button>
          <Button
            className={currentWaypoint === 1 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('wtf-is-a-metagame')}
          >
            <Text as="span">02</Text>
          </Button>
          <Button
            className={currentWaypoint === 2 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('build-the-future')}
          >
            <Text as="span">03</Text>
          </Button>
          <Button
            className={currentWaypoint === 3 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('the-wild-web')}
          >
            <Text as="span">04</Text>
          </Button>
          <Button
            className={currentWaypoint === 4 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('why-are-we-here')}
          >
            <Text as="span">05</Text>
          </Button>
          <Button
            className={currentWaypoint === 5 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('what-do')}
          >
            <Text as="span">06</Text>
          </Button>
          <Button
            className={currentWaypoint === 6 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('onboard')}
          >
            <Text as="span">07</Text>
          </Button>
          <Button
            className={currentWaypoint === 7 ? 'active' : ''}
            colorScheme="ghost"
            onClick={() => handleSectionNav('join-us')}
          >
            <Text as="span">08</Text>
          </Button>
        </VStack>
      </Box>
      {/* )}
      {currentWaypoint === 6 && (
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        height="100%"
        opacity={currentWaypoint === 6 ? 1 : 0}
        transition="transform 0.3s 0.1s ease, opacity 0.3s 0.3s ease"
        transform={`translate3d(${currentWaypoint === 6 ? 0 : -200}px, 0, 0)`}
      >
        <VStack
          spacing={2}
          minW={5}
          zIndex={400}
          sx={{
            button: {
              background: 'transparent',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              minW: '20px',
              maxH: '20px',
              p: 0,
              '& > span': {
                border: `1px solid rgba(255,255,255,0.0)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '10px',
                height: '10px',
                maxW: '10px',
                maxH: '10px',
                p: '10px',
                overflow: 'clip',
                textIndent: '-9999rem',
                transition: 'all 0.3s 0.2s ease-in-out',
                '&::after': {
                  content: '""',
                  display: 'block',
                  background: 'landing300',
                  borderRadius: '50%',
                  width: '5px',
                  height: '5px',
                  minW: '5px',
                  minH: '5px',
                },
              },
              '&.active': {
                '& > span': {
                  border: `1px solid  var(--landing300)`,
                },
              },
            },
          }}
        >
          <Box fontSize="xs" fontWeight={200}>
            {`0${currentWaypoint + 1}`}
          </Box>
          <Button
            colorScheme="ghost"
            onClick={() => handleSectionNav('slide-1')}
          >
            <Text as="span">01</Text>
          </Button>
          <Button
            colorScheme="ghost"
            onClick={() => handleSectionNav('slide-2')}
          >
            <Text as="span">02</Text>
          </Button>
          <Button
            colorScheme="ghost"
            onClick={() => handleSectionNav('slide-3')}
          >
            <Text as="span">03</Text>
          </Button>
          <Button
            colorScheme="ghost"
            onClick={() => handleSectionNav('slide-4')}
          >
            <Text as="span">04</Text>
          </Button>
          <Button
            colorScheme="ghost"
            onClick={() => handleSectionNav('slide-5')}
          >
            <Text as="span">05</Text>
          </Button>
          <Button
            colorScheme="ghost"
            onClick={() => handleSectionNav('slide-6')}
          >
            <Text as="span">06</Text>
          </Button>
        </VStack>
      </Box>

      )} */}
    </Box>
  );
};
