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

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const ArrowUp: React.FC = () => (
  <svg strokeWidth={0} viewBox="0 0 16 16" focusable="false">
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
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown, scrollContainer]);

  return (
    <>
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
