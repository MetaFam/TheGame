import { Center, Link, MetaButton, Spinner, Stack, Text } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { useMounted, useUser, useWeb3 } from 'lib/hooks';
import React from 'react';
import { errorHandler } from 'utils/errorHandler';

type PlayerPageType = React.FC<{ player: Player }>;

export const ConnectedPage: React.FC<{
  page: PlayerPageType;
  pageLabel?: string;
}> = ({ page: Page, pageLabel = 'this page' }) => {
  const { connect, connecting, connected } = useWeb3();
  const { user, fetching, error } = useUser();
  const mounted = useMounted();

  if (!mounted || (!connecting && !connected)) {
    return (
      <Text textAlign="center" mt="25vh">
        Please <MetaButton onClick={connect}>connect</MetaButton> to access{' '}
        {pageLabel}.
      </Text>
    );
  }

  if (connecting || fetching) {
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text fontSize="xl">
            {connecting ? 'Connecting…' : 'Fetching User…'}
          </Text>
          <Spinner thickness="6px" color="whiteAlpha" size="xl" />
        </Stack>
      </Center>
    );
  }

  if (user) {
    return <Page player={user} />;
  }

  if (error) {
    errorHandler(error);
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text>
            Error Loading User: <q>{error.message}</q>
          </Text>
          <MetaButton onClick={connect}>Try Again</MetaButton>
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
