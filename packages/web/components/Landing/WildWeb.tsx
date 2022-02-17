import { Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/wildweb-background.png';
import { FullPageContainer } from 'components/Container';

export const WildWeb: React.FC = () => (
  <FullPageContainer bgImageUrl={BackgroundImage}>
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem' }}
      spacing={{ base: 4, md: 8 }}
      align="stretch"
    >
      <Text>
        Web3 technologies are allowing us to{' '}
        <b>reimagine socioeconomic systems</b> from ground up.
      </Text>
      <Text>
        A new world is being built but it’s <b>hard to navigate.</b>
      </Text>
      <Text>
        The resources, building blocks & tools are all over the place{' '}
        <b>but the maps are inexistent.</b>
      </Text>
      <Text>
        There are pitfalls, gold rushing cowboys & snake oil salesmen at every
        corner.
      </Text>

      <Text textTransform="uppercase">It’s a Wild Web.</Text>
    </VStack>
  </FullPageContainer>
);
