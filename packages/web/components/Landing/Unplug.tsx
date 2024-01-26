import { Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/unplug-background.webp';
import { FullPageContainer } from 'components/Container';


export const Unplug: React.FC = () => (
  <FullPageContainer bgImageUrl={BackgroundImage.src}>
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem', lg: '64rem' }}
      spacing={8}
      align="stretch"
    >
      <Text textAlign="center">
        So unplug yourself from the matrix & enter the future.
      </Text>

      <Text textAlign="center">earn, earn & make a difference.</Text>
    </VStack>
  </FullPageContainer>
);
