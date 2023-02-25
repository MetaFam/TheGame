import { MetaHeading, Stack, Text } from '@metafam/ds';
import { ConnectToProgress, MetaGameLogo } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { PlayerTile } from 'components/Player/PlayerTile';
import { useUser, useWeb3 } from 'lib/hooks';

export const SetupDone: React.FC = () => {
  const { user } = useUser();
  const { connected } = useWeb3();

  if (!user || !connected) {
    return (
      <FlexContainer my="auto">
        <ConnectToProgress showSwitchButton={false} />
      </FlexContainer>
    );
  }

  return (
    <FlexContainer flex={1} mb={8}>
      <MetaGameLogo />
      <MetaHeading mb={10}>Game On!</MetaHeading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={8}
        justify="center"
        align="center"
      >
        <PlayerTile player={user} />
        <Stack spacing={4} p={4} maxW="25rem" fontSize="md" h="100%">
          <Text fontSize="lg">Congrats on making yourself a profile! 🎉</Text>
          <Text fontSize="md">
            It should come in handy for you to present yourself to the rest of
            the DAO ecosystem & collaborate with others 🙃{' '}
          </Text>
          <Text fontSize="md">
            Next, you should take the {''}
            <MetaLink
              textDecor="underline"
              color="pink.400"
              href="/play/paths/engaged-octos-path"
              fontWeight="bold"
            >
              Path of The Engaged Octopi
            </MetaLink>{' '}
            to get yourself properly onboarded into MetaGame.
          </Text>
          <Text fontSize="md">We're excited to have you! 🐙</Text>
        </Stack>
      </Stack>
    </FlexContainer>
  );
};
