import { useBreakpointValue } from '@metafam/ds';
import BackgroundImage from 'assets/login-background.jpg';
import { FullPageContainer } from 'components/Container';
import { LandingHeader } from 'components/Landing/LandingHeader';
import OnboardingGuidance from 'components/Landing/OnboardingGuidance';
import { HeadComponent } from 'components/Seo';
import { Socials } from 'pages';
import { useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const OnboardingGuide: React.FC = () => {
  const responsiveBg = useBreakpointValue({
    base: BackgroundImage,
  });
  const [hostName, setHostName] = useState('https://metagame.wtf');
  return (
    <>
      <HeadComponent
        title="MetaGame: Onboarding Guide 🐙"
        description=" Your journey into MetaGame has just begun. Here's how it works..."
        url={hostName}
        img={`${hostName}/assets/social.png`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <FullPageContainer
        id="onboarding-guide"
        position="relative"
        bgSize="cover"
        bgImageUrl={responsiveBg?.src}
        overflow="auto"
        minH="100vh"
      >
        <OnboardingGuidance />
      </FullPageContainer>
      <Socials />
    </>
  );
};
export default OnboardingGuide;
