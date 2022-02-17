import { Image, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/intro-background.png';
import MetaGameLogo from 'assets/landing/synthlogo-2.svg';
import { FullPageContainer } from 'components/Container';

export const Intro: React.FC = () => (
  <FullPageContainer
    bgImageUrl={BackgroundImage}
    spacing={8}
    justify="flex-end"
  >
    <Image src={MetaGameLogo} />
    <Text fontSize="1rem" fontWeight="normal" color="white">
      A Massive Online Coordination Game
    </Text>
  </FullPageContainer>
);
