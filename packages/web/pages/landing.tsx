import { Box, BoxedNextImage, Button, HStack, Link } from '@metafam/ds';
import MetaGameLogo from 'assets/logo-new.png';
import { PageContainer } from 'components/Container';
import { Build } from 'components/Landing/Build';
import { Game } from 'components/Landing/Game';
import { Intro } from 'components/Landing/Intro';
import { JustWatch } from 'components/Landing/JustWatch';
import { LandingHeader } from 'components/Landing/LandingHeader';
import { Optimal } from 'components/Landing/Optimal';
import { Revolution } from 'components/Landing/Revolution';
import { Together } from 'components/Landing/Together';
import { WhatWeDo } from 'components/Landing/WhatWeDo';
import { Who } from 'components/Landing/Who';
import { WildWeb } from 'components/Landing/WildWeb';
import { MetaLink } from 'components/Link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const Landing: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('section-1');
  const router = useRouter();

  const hash = router.asPath.split('#');
  useEffect(() => {
    setCurrentSection(hash[1]);
  }, [hash]);

  return (
    <>
      <LandingHeader />
      <PageContainer position="relative" p={0}>
        <Intro />
        <Game />
        <Build />
        <Revolution />
        <WildWeb />
        <Together />
        <WhatWeDo />
        <Optimal />
        <Who />
        <JustWatch />
      </PageContainer>
      {currentSection === 'section-10' && (
        <Box
          as="footer"
          d="flex"
          w="33%"
          flexFlow="row nowrap"
          position="fixed"
          justifyContent="center"
          bottom={20}
          left="33%"
          opacity={currentSection !== 'section-10' ? 0 : 1}
          transition="opacity 0.3s 0.3s ease"
          zIndex={300}
        >
          <HStack spacing={8} alignItems="center">
            <Link
              href="#section-1"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textDecoration: 'none',
                  filter: 'drop-shadow(0 0 15px #FF61E6)',
                },
              }}
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
                {/* <Box as="span">MetaGame</Box> */}
              </HStack>
            </Link>
          </HStack>
        </Box>
      )}
      <MetaLink
        className="topLink"
        position="fixed"
        bottom={20}
        right={8}
        href="#section-1"
        opacity={currentSection === 'section-1' ? 0 : 1}
        transform={`translate3d(0,${
          currentSection === 'section-1' ? '30px' : '0px'
        },0)`}
        transition="transform 0.3s 0.3s ease-in-out, opacity 0.3s 0.3s ease-in-out"
      >
        <Button
          className="gradient-text"
          colorScheme="white"
          rightIcon={<BsArrowUp />}
        >
          Back to top
        </Button>
      </MetaLink>
    </>
  );
};
export default Landing;
