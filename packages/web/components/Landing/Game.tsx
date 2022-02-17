import { Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/game-background.png';
import { FullPageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';

export const Game: React.FC = () => (
  <FullPageContainer bgImageUrl={BackgroundImage}>
    <VStack
      align="stretch"
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem' }}
    >
      <Text>
        “Metagame is any approach to a game that transcends or operates outside
        of the prescribed rules of the game, uses external factors to affect the
        game, or goes beyond the supposed limits or environment set by the
        game.”
      </Text>
      <Text textAlign="right">
        - From <MetaLink href="#">The Wiki</MetaLink>
      </Text>
    </VStack>
  </FullPageContainer>
);
