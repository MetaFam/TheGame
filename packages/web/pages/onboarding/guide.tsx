import BackgroundImage from 'assets/login-background.jpg';
import { PageContainer } from 'components/Container';
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
      <PageContainer
        p={0}
        h="screen"
        w="100%"
        {...{
          bg: `url('${BackgroundImage.src}') no-repeat`,
          bgSize: 'cover',
          bgPos: 'center',
          bgAttachment: 'fixed',
        }}
      >
        <OnboardingGuidance />
      </PageContainer>
      <Socials />
    </>
  );
};
export default OnboardingGuide;
