import { useBreakpointValue } from '@metafam/ds';
import BackgroundImage from 'assets/login-background.jpg';
import { FullPageContainer } from 'components/Container';
import { LandingHeader } from 'components/Landing/LandingHeader';
import OnboardingGuidance from 'components/Landing/OnboardingGuidance';
import { HeadComponent } from 'components/Seo';
import { Socials } from 'pages';
import { useRef } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const OnboardingGuide: React.FC = () => {
  const responsiveBg = useBreakpointValue({
    base: BackgroundImage,
  });
  const hostName = useRef('https://metagame.wtf');
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
        bgImageUrl={responsiveBg?.src}
        overflow="scroll"
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
