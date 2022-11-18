import { useBreakpointValue } from '@metafam/ds';
import BackgroundImage from 'assets/login-background.jpg';
import { FullPageContainer } from 'components/Container';
import { LandingHeader } from 'components/Landing/LandingHeader';
import OnboardingGuidance from 'components/Landing/OnboardingGuidance';
import { HeadComponent } from 'components/Seo';
import { Socials } from 'pages';
import { useCallback, useEffect, useRef, useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const OnboardingGuide: React.FC = () => {
  const responsiveBg = useBreakpointValue({
    base: BackgroundImage,
  });
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
    document.querySelector('body')?.classList.add('onboarding-guide');

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
        title="MetaGame: Onboarding Guide 🐙"
        description=" Your journey into MetaGame has just begun. Here's how it works..."
        url={hostName.current}
        img={`${hostName.current}/assets/social.png`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <FullPageContainer
        id="onboarding-guide"
        position="relative"
        bgSize="cover"
        bgImageUrl={responsiveBg?.src}
        overflow="auto"
        spacing={12}
        minH={{ base: '100vh' }}
      >
        <OnboardingGuidance />
      </FullPageContainer>
      <Socials />
    </>
  );
};
export default OnboardingGuide;
