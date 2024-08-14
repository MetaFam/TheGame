import { CONFIG } from 'config';

import BackgroundImage from '#assets/login-background.jpg';
import { FullPageContainer } from '#components/Container';
import { LandingHeader } from '#components/Landing/LandingHeader';
import OnboardingGuidance from '#components/Landing/OnboardingGuidance';
import { HeadComponent } from '#components/Seo';
import { Socials } from '#components/SocialLinks';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const OnboardingGuide: React.FC = () => {
  const { publicURL } = CONFIG;

  return (
    <>
      <HeadComponent
        title="Onboarding Guide 🐙"
        description="Your journey into MetaGame has just begun. Here's how it works…"
        url={publicURL}
        img={`${publicURL}/assets/social.webp`}
        cardStyle="summary_large_image"
      />
      <LandingHeader />
      <FullPageContainer
        bgImage={BackgroundImage.src}
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        overflow="auto"
      >
        <OnboardingGuidance />
      </FullPageContainer>
      <Socials />
    </>
  );
};
export default OnboardingGuide;
