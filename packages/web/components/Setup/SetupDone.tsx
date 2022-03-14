import { ListItem, MetaHeading, Stack, Text, UnorderedList } from '@metafam/ds';
import { ConnectToProgress, MetaGameLogo } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { PlayerTile } from 'components/Player/PlayerTile';
import { useUser, useWeb3 } from 'lib/hooks';
import React from 'react';
import { getPlayerURL } from 'utils/playerHelpers';

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
        {user && <PlayerTile player={user} />}
        <Stack spacing={4} p={4} maxW="25rem" fontSize="md" h="100%">
          <Text fontSize="lg">Here's what you could do next:</Text>
          <UnorderedList spacing={2} pl={4}>
            <ListItem>
              Check out{' '}
              <MetaLink
                textDecor="underline"
                color="pink.400"
                as={getPlayerURL(user)}
                href="/player/[username]"
                fontWeight="bold"
              >
                your profile
              </MetaLink>
              , further customize it & share it with friends.
            </ListItem>
            <ListItem>
              Proceed to the{' '}
              <MetaLink
                textDecor="underline"
                color="pink.400"
                href="/dashboard"
                fontWeight="bold"
              >
                dashboard
              </MetaLink>{' '}
              & explore the rest of the MetaOS v0.1.
            </ListItem>
            <ListItem>
              Go to{' '}
              <MetaLink
                textDecor="underline"
                fontWeight="bold"
                color="pink.400"
                href="//discord.gg/metagame"
                isExternal
              >
                discord
              </MetaLink>
              , the main place where MetaGame is currently played.
            </ListItem>
            <ListItem>
              <MetaLink
                textDecor="underline"
                color="pink.400"
                href="//metagame.substack.com/?utm_source=discover_search"
                fontWeight="bold"
                isExternal
              >
                Subscribe
              </MetaLink>{' '}
              to our newsletter stay in the loop on the latest happenings,
              content & features.
            </ListItem>
          </UnorderedList>
          <Text> Wish you a great journey & see you around!</Text>
        </Stack>
      </Stack>
    </FlexContainer>
  );
};
