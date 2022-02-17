import { Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/build-background.png';
import { FullPageContainer } from 'components/Container';

export const Build: React.FC = () => (
  <FullPageContainer bgImageUrl={BackgroundImage}>
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem' }}
      spacing={8}
      align="stretch"
    >
      <Text>
        Many have already woken up to the world-shaping potential of Web3
        technologies.
      </Text>

      <Text>
        Some are grabbing the opportunity to build the future they want to live
        in.
      </Text>
    </VStack>
  </FullPageContainer>
);
