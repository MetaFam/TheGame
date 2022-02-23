import { Button } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { Build } from 'components/Landing/Build';
import { Game } from 'components/Landing/Game';
import { Intro } from 'components/Landing/Intro';
import { JustWatch } from 'components/Landing/JustWatch';
import { LandingFooter } from 'components/Landing/LandingFooter';
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
      <PageContainer position="relative" className="landing" p={0}>
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
        <LandingFooter currentSection={currentSection} />
      )}
      <MetaLink
        className="topLink"
        position="fixed"
        bottom={{ base: 5, '2xl': 20 }}
        right={{ base: 0, '2xl': 8 }}
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
