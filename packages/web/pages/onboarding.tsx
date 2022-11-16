import { Box, Tooltip, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { LandingHeader } from 'components/Landing/LandingHeader';
import { Onboard } from 'components/Landing/Onboard';
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
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

const Onboarding: React.FC = () => {
  const scrollContainer =
    typeof document !== 'undefined'
      ? document.getElementById('scroll-container')
      : null;
  const [section, setSection] = useState(0);
  const hostName = useRef('https://metagame.wtf');
  const setHostName = useCallback((host: string) => {
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
    document.querySelector('body')?.classList.add('onboarding');

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
        title="MetaGame: Onboarding Game 🐙"
        description="Start your journey into MetaGame here! Play the Onboarding Game and follow the purple octo..."
        url={hostName.current}
        img={`${hostName.current}/assets/social.png`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <PageContainer p={0}>
        <Onboard />
      </PageContainer>
      <Socials />
    </>
  );
};
export default Onboarding;

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
