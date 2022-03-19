import { Box, Button, Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { Build } from 'components/Landing/Build';
import { Game } from 'components/Landing/Game';
import { Intro } from 'components/Landing/Intro';
import { JoinUs } from 'components/Landing/JoinUs';
import { LandingHeader } from 'components/Landing/LandingHeader';
import { Optimal } from 'components/Landing/Optimal';
import { Revolution } from 'components/Landing/Revolution';
import { Together } from 'components/Landing/Together';
import { WhatWeDo } from 'components/Landing/WhatWeDo';
import { Who } from 'components/Landing/Who';
import { WildWeb } from 'components/Landing/WildWeb';
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
import React, { useCallback, useEffect, useState } from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

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
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown, scrollContainer]);

  return (
    <>
      <HeadComponent
        title="MetaGame"
        description="To find your metagame means to play life in the optimal way. Coordinating with others on building a better world; doing things that create a a positive impact make you happy AND earn you money."
        url="https://metagame.wtf"
        img="https://metagame.wtf/_next/image?url=%2Fassets%2Fmanifesto.jpg&amp;w=1080&amp;q=75"
      />
      <LandingHeader />
      <PageContainer p={0}>
        <Intro currentSection={section} /> {/* section 0 */}
        <Game /> {/* section 1 */}
        <Build /> {/* section 2 */}
        <Revolution /> {/* section 3 */}
        <WildWeb /> {/* section 4 */}
        <Together /> {/* section 5 */}
        <WhatWeDo /> {/* section 6 */}
        <Optimal /> {/* section 7 */}
        <Who /> {/* section 8 */}
        <JoinUs /> {/* section 9 */}
      </PageContainer>
      <SectionWayPoints />
      <Socials />
      <MetaLink
        position="fixed"
        bottom={{ base: 0, md: 4 }}
        right={{ base: 0, md: 4 }}
        href="#start"
        display={section === 0 ? 'none' : 'block'}
        transform={`translate3d(0,${section === 0 ? '30px' : 0},0)`}
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
    right={5}
    spacing={3}
    minW={5}
    zIndex={400}
    flexFlow="column-reverse"
    sx={{
      opacity: 0.7,
      transition: 'opacity 0.2s 0.2s ease',
      '&:hover': {
        opacity: 1,
      },
      a: {
        color: 'white',
        fontSize: '2xl',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      },
    }}
  >
    <Text
      as="span"
      sx={{
        flex: 1,
        transform: ' translateY(40px) rotate(-90deg)',
      }}
    >
      Follow us
    </Text>
    <MetaLink href="https://twitter.com">
      <FaGithub />
    </MetaLink>
    <MetaLink href="https://twitter.com">
      <FaDiscord />
    </MetaLink>
    <MetaLink href="https://twitter.com">
      <FaTwitter />
    </MetaLink>
  </VStack>
);

export const SectionWayPoints: React.FC = () => {
  // const sections = 6
  // const Waypoint = <MetaLink href="#">dot</MetaLink>
  // const waypoints = []
  const active = true;
  const activeSection = '01';

  return (
    <VStack
      className="section-waypoints"
      position="fixed"
      top="66%"
      left={5}
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
            border: `1px solid ${'transparent'}`,
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
              border: `1px solid ${'white'}`,
            },
          },
        },
      }}
    >
      <Box fontSize="xs" fontWeight={100}>
        {activeSection}
      </Box>
      <Button className={active && 'active'} colorScheme="ghost">
        <Text as="span">01</Text>
      </Button>
      <Button colorScheme="ghost">
        <Text as="span">02</Text>
      </Button>
      <Button colorScheme="ghost">
        <Text as="span">03</Text>
      </Button>
      <Button colorScheme="ghost">
        <Text as="span">04</Text>
      </Button>
      <Button colorScheme="ghost">
        <Text as="span">05</Text>
      </Button>
      <Button colorScheme="ghost">
        <Text as="span">06</Text>
      </Button>
    </VStack>
  );
};
