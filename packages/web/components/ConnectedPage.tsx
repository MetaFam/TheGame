import { Center, Flex, Link, Spinner, Stack, Text } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { ConnectKitButton } from 'connectkit';
import { Player } from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { useMounted, useUser } from 'lib/hooks';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { useAccount } from 'wagmi';

type PlayerPageType = React.FC<{ player: Maybe<Player> }>;

export const ConnectedPage: React.FC<{
  page: PlayerPageType;
  label?: string;
}> = ({ page: Page, label = 'this page' }) => {
  const { address, isConnected, isConnecting } = useAccount();
  const [player, setPlayer] = useState<Maybe<Player>>(null);
  const { user, fetching, error } = useUser();
  const mounted = useMounted();

  useEffect(() => {
    if (!address) return;
    function getPeople() {
      if (address) {
        return getPlayer(address);
      }
      throw new Error('No address');
    }
    getPeople().then(setPlayer);
  }, [address]);

  if (!mounted || (!isConnecting && !isConnected)) {
    return (
      <Flex textAlign="center" mt="25vh" align="center" justifyContent="center">
        Please&#xA0;
        <ConnectKitButton />
        &#xA0;to access {label}.
      </Flex>
    );
  }

  if (isConnecting || fetching) {
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text fontSize="xl">
            {isConnecting ? 'Connecting…' : 'Fetching User…'}
          </Text>
          <Spinner thickness="0.25rem" color="whiteAlpha" size="xl" />
        </Stack>
      </Center>
    );
  }

  if (address && player) {
    return <Page {...{ player }} />;
  }

  if (error) {
    errorHandler(error);
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text>
            Error Loading User: <q>{error.message}</q>
          </Text>
          <ConnectKitButton />
        </Stack>
      </Center>
    );
  }

  return (
    <Text textAlign="center" mt="25vh">
      Not sure how we got here… Something is decidedly amiss. Please{' '}
      <Link href="https://github.com/MetaFam/TheGame/issues" color="landing300">
        submit an issue
      </Link>
      .
    </Text>
  );
};
