import { Center, Flex, Link, Spinner, Stack, Text } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { ConnectKitButton } from 'connectkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { Player } from '#graphql/autogen/hasura-sdk';
import { getPlayer } from '#graphql/getPlayer';
import { useMounted, useUser } from '#lib/hooks';

type PlayerPageType = React.FC<{ player: Maybe<Player> }>;

export const ConnectedPage: React.FC<{
  page: PlayerPageType;
  label?: string;
}> = ({ page: Page, label = 'this page' }) => {
  const { isConnected, isConnecting } = useAccount();
  const { user: player } = useUser()
  const mounted = useMounted();

  if (!mounted || (!isConnecting && !isConnected)) {
    return (
      <Flex textAlign="center" mt="25vh" align="center" justifyContent="center">
        Please&#xA0;
        <ConnectKitButton />
        &#xA0;to access {label}.
      </Flex>
    );
  }

  if (isConnecting) {
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text fontSize="xl">Connecting…</Text>
          <Spinner thickness="0.25rem" color="whiteAlpha" size="xl" />
        </Stack>
      </Center>
    );
  }

  if (player) {
    return <Page {...{ player }} />;
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
