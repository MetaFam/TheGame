import { Center, Link, Spinner, Stack, Text } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { useMounted, useUser, useWeb3 } from 'lib/hooks';
import { useAccount } from 'wagmi';
import { errorHandler } from 'utils/errorHandler';
import { ConnectKitButton } from 'connectkit';
import { useEffect, useState } from 'react';
import { getPlayer } from 'graphql/getPlayer';

type PlayerPageType = React.FC<{ player: Maybe<Player> }>;

export const ConnectedPage: React.FC<{
  page: PlayerPageType;
  pageLabel?: string;
}> = ({ page: Page, pageLabel = 'this page' }) => {
  const { address, isConnected, isConnecting } = useAccount();
  const [player, setPlayer] = useState<Maybe<Player>>(null);
  const { user, fetching, error } = useUser();
  const mounted = useMounted();
  useEffect(() => {
    if (!address) return;
    async function getPeople() {
      if (address) {
        const player = await getPlayer(address);
        return player
      }
    }
    getPeople().then(player => setPlayer(player!))
  }, [address])
  if (!mounted || (!isConnecting && !isConnected)) {
    return (
      <Text textAlign="center" mt="25vh">
        Please <ConnectKitButton /> to access{' '}
        {pageLabel}.
      </Text>
    );
  }

  if (isConnecting || fetching) {
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text fontSize="xl">
            {isConnecting ? 'Connecting…' : 'Fetching User…'}
          </Text>
          <Spinner thickness="6px" color="whiteAlpha" size="xl" />
        </Stack>
      </Center>
    );
  }

  if (address && player) {
    return <Page player={player} />;
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
      <Link href="https://github.com/MetaFam/TheGame/issues">
        submit an issue
      </Link>
      .
    </Text>
  );
};
