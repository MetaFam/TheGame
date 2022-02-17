import { MetaButton, MetaSecondaryButton, Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/just-watch-background.png';
import { FullPageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';

export const JustWatch: React.FC = () => (
  <FullPageContainer
    bgImageUrl={BackgroundImage}
    justify={{ base: 'center', md: 'flex-end' }}
  >
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      spacing={8}
      py="5rem"
    >
      <Text textAlign="center">
        The revolution will be televized, but don’t just watch.
      </Text>

      <MetaLink
        isExternal
        _hover={{}}
        href="https://wiki.metagame.wtf/docs/enter-metagame/join-metagame"
      >
        <MetaButton fontSize="lg" w="12rem">
          Join
        </MetaButton>
      </MetaLink>
      <MetaLink _hover={{}} isExternal href="https://wiki.metagame.wtf/docs/">
        <MetaSecondaryButton fontSize="lg" w="12rem">
          Explore
        </MetaSecondaryButton>
      </MetaLink>
    </VStack>
  </FullPageContainer>
);
