import { Button } from '@metafam/ds';
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
import React, { useCallback, useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const Landing: React.FC = () => {
  const scrollContainer =
    typeof document !== 'undefined'
      ? document.getElementById('scroll-container')
      : null;

  const [section, setSection] = useState(0);

  const handleScroll = useCallback(() => {
    const position = scrollContainer?.scrollTop ?? 0;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1;
    setSection(Math.floor(position / height));
  }, [scrollContainer]);

  useEffect(() => {
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, scrollContainer]);

  return (
    <>
      <LandingHeader />
      <PageContainer p={0}>
        <Intro /> {/* section 0 */}
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
      <MetaLink
        position="fixed"
        bottom={{ base: 0, md: 4 }}
        right={{ base: 0, md: 4 }}
        href="#start"
        display={section === 0 ? 'none' : 'block'}
        transform={`translate3d(0,${section === 0 ? '30px' : '0px'},0)`}
        transition="transform 0.3s 0.3s ease-in-out, opacity 0.3s 0.3s ease-in-out"
      >
        <Button colorScheme="white" rightIcon={<BsArrowUp />}>
          Back to top
        </Button>
      </MetaLink>
    </>
  );
};
export default Landing;
