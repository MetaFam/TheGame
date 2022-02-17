import { Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/who-background.png';
import { FullPageContainer } from 'components/Container';
import { Cards } from 'components/Landing/Cards';

export const Who: React.FC = () => (
  <FullPageContainer
    bgImageUrl={BackgroundImage}
    fontSize={{ base: 'xl', md: '5xl' }}
    spacing={12}
    px={12}
    py="6rem"
    minH={{ base: 'unset', md: '100vh' }}
  >
    <Text textAlign="center">So, whom is it for?</Text>
    <Cards />
  </FullPageContainer>
);
