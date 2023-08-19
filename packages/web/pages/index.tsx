import { Box, Button, Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { Build } from 'components/Landing/Build';
import { Game } from 'components/Landing/Game';
import { Intro } from 'components/Landing/Intro';
import { JoinUs } from 'components/Landing/JoinUs';
import { LandingHeader } from 'components/Landing/LandingHeader';
import { sections } from 'components/Landing/landingSection';
import { WhatDo } from 'components/Landing/WhatDo';
import { WhatSay } from 'components/Landing/WhatSay';
import { WhoAreWe } from 'components/Landing/WhoAreWe';
import { WhyAreWeHere } from 'components/Landing/WhyAreWeHere';
import { WildWeb } from 'components/Landing/WildWeb';
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
import { SocialsDesktop } from 'components/SocialLinks';
import { CONFIG } from 'config';
import { getPatrons } from 'graphql/getPatrons';
import { getGuilds } from 'graphql/queries/guild';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patrons = await getPatrons(11);
  const guilds = await getGuilds();

  return {
    props: {
      guilds,
      patrons,
      hideTopMenu: true,
    },
  };
};

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

const Landing: React.FC<Props> = ({ patrons, guilds }) => {
  const scrollContainer =
    typeof document !== 'undefined'
      ? document.getElementById('scroll-container')
      : null;
  const [section, setSection] = useState(0);
  const [hostName, setHostName] = useState(CONFIG.publicURL);

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

    setHostName(window.location.origin);

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
        url={hostName}
        img={`${hostName}/assets/social.webp`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <PageContainer p={0}>
        <Intro
          section={sections[0]}
          nextSection={sections[1]}
          activeSectionIndex={section}
        />
        <Game
          section={sections[1]}
          nextSection={sections[2]}
          activeSectionIndex={section}
        />
        <Build
          section={sections[2]}
          nextSection={sections[3]}
          activeSectionIndex={section}
        />
        <WildWeb
          section={sections[3]}
          nextSection={sections[4]}
          activeSectionIndex={section}
        />
        <WhyAreWeHere
          section={sections[4]}
          nextSection={sections[5]}
          activeSectionIndex={section}
        />
        <WhatDo
          section={sections[5]}
          nextSection={sections[6]}
          activeSectionIndex={section}
        />
        {guilds && patrons && (
          <WhoAreWe
            guilds={guilds}
            patrons={patrons}
            section={sections[6]}
            nextSection={sections[7]}
            activeSectionIndex={section}
          />
        )}
        <WhatSay
          section={sections[7]}
          nextSection={sections[8]}
          activeSectionIndex={section}
        />
        <JoinUs section={sections[8]} activeSectionIndex={section} />
      </PageContainer>
      <SectionWayPoints currentWaypoint={section} />
      <SocialsDesktop />
      <MetaLink
        position="fixed"
        bottom={{ base: 20, md: 4 }}
        right={{ base: 0, md: 4 }}
        href="#start"
        opacity={section === 0 ? 0 : 1}
        transform={`translate3d(0, ${section === 0 ? '30px' : 0}, 0)`}
        transition="transform 0.3s 0.3s ease-in-out, opacity 0.3s 0.3s ease-in-out"
        _hover={{ textDecor: 'none' }}
        zIndex={10}
      >
        <Button
          className="gradient-text"
          colorScheme="white"
          rightIcon={<ArrowUp />}
        >
          Back to Top
        </Button>
      </MetaLink>
    </>
  );
};
export default Landing;

type SectionWayPointsProps = {
  currentWaypoint: number;
};

const SectionWayPoints: React.FC<SectionWayPointsProps> = ({
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
          {sections.map((section, index) => (
            <Button
              key={`key-${index}`}
              className={currentWaypoint === index ? 'active' : ''}
              colorScheme="ghost"
              onClick={() => handleSectionNav(section.internalLinkId)}
            >
              <Text as="span">{section.label}</Text>
            </Button>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
