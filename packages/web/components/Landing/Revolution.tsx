import { Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/revolution-background.png';
import { FullPageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';

export const Revolution: React.FC = () => (
  <FullPageContainer
    bgImageUrl={BackgroundImage}
    justify={{ base: 'center', md: 'flex-end' }}
  >
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem' }}
      spacing={8}
      align="stretch"
      pb={8}
    >
      <Text>A revolution is happening online;</Text>

      <Text>
        will you{' '}
        <MetaLink
          color="pinkShadeOne"
          href="https://wiki.metagame.wtf/docs/enter-metagame/join-metagame"
          isExternal
        >
          join
        </MetaLink>{' '}
        or miss out?
      </Text>
    </VStack>
  </FullPageContainer>
);
