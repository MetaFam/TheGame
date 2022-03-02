import { Container } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import { FullPageContainer } from 'components/Container';
import { IntroHero } from 'components/Landing/IntroHero';

export const Intro: React.FC = () => (
  <FullPageContainer
    id="start"
    bgImageUrl={BackgroundImage}
    spacing={8}
    justify="flex-end"
  >
    <Container
      d="flex"
      maxW={{ base: '100%', xl: '7xl', '2xl': '8xl' }}
      height="100%"
      alignItems="flex-end"
      justifyContent="center"
    >
      <IntroHero />
    </Container>
  </FullPageContainer>
);
