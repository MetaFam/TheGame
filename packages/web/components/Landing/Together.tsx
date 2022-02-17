import { Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/together-background.png';
import { FullPageContainer } from 'components/Container';

export const Together: React.FC = () => (
  <FullPageContainer bgImageUrl={BackgroundImage}>
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem' }}
      spacing={8}
      align="stretch"
      bgGradient="linear-gradient(180deg, #FFFFFF 15.3%, #FD208A 85.41%)"
      bgClip="text"
      textAlign="center"
    >
      <Text>
        We are bringing together the people & building blocks aligned on the
        idea of creating a new kind of society.
      </Text>
      <Text>One that is optimized for human wellbeing rather than profit.</Text>
      <Text>
        One that revolves around solving problems & living well, in balance with
        nature.
      </Text>
    </VStack>
  </FullPageContainer>
);
