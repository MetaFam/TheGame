import React, { lazy, useCallback, useEffect, useRef, useState } from 'react';

import { LandingHeader } from '#components/Landing/LandingHeader';
import { Onboard } from '#components/Landing/Onboard';
import { HeadComponent } from '#components/Seo';
import { SocialsDesktop } from '#components/SocialLinks';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const PageContainer = lazy(() => import('components/Container'));

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
        title="Onboarding Game 🐙"
        description="Start your journey into MetaGame here! Play the Onboarding Game and follow the purple octo..."
        url={hostName.current}
        img={`${hostName.current}/assets/social.webp`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <PageContainer p={0}>
        <Onboard />
        <SocialsDesktop />
      </PageContainer>
    </>
  );
};
export default Onboarding;
