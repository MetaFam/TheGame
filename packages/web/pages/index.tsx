import { Box, Button, Text, Tooltip, VStack } from '@metafam/ds';
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
// import { gsap } from "gsap";
// import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaDiscord,
  FaGithub,
  FaHome,
  FaTrophy,
  FaTwitter,
  FaUserCircle,
} from 'react-icons/fa';

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
  const scrollContainer =
    typeof document !== 'undefined'
      ? document.getElementById('scroll-container')
      : null;
  const [section, setSection] = useState(0);
  const hostName = useRef('https://metagame.wtf');
  const setHostName = useCallback((host) => {
    hostName.current = host;
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
      >
        <Button
          className="gradient-text"
          colorScheme="white"
          rightIcon={<ArrowUp />}
        >
          Back to top
        </Button>
      </MetaLink>
    </>
  );
};
export default Landing;

export const Socials: React.FC = () => (
  <VStack
    position="fixed"
    top="33%"
    right={{ base: 2, md: 5 }}
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
