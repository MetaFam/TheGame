import { LandingHeader } from 'components/Landing/LandingHeader';
import { Signup } from 'components/Landing/Signup';
import { HeadComponent } from 'components/Seo';
import { SocialsDesktop } from 'components/SocialLinks';
import { lazy, useCallback, useEffect, useRef, useState } from 'react';

const PageContainer = lazy(() => import('components/Container'));

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
    document.querySelector('body')?.classList.add('signup');

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
        title="Signup 🐙"
        description="Start your journey into MetaGame here! Sign up as a player, guild or patron..."
        url={hostName.current}
        img={`${hostName.current}/assets/social.webp`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <PageContainer
        p={0}
        overflowX="hidden"
        minHeight={{ base: '120%', lg: '100%' }}
      >
        <Signup />
        <SocialsDesktop />
      </PageContainer>
    </>
  );
};
export default Onboarding;
