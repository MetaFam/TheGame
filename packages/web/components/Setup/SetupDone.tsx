import { Image, MetaButton, MetaHeading, Stack } from '@metafam/ds';
import discord from 'assets/discord.svg';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { PlayerTile } from 'components/Player/PlayerTile';
import { useUser } from 'lib/hooks';
import React from 'react';

export const SetupDone: React.FC = () => {
  const { user } = useUser();
  return (
    <FlexContainer flex={1} mb={8}>
      <MetaHeading mb={10}>Game On!</MetaHeading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align="center"
      >
        {user && <PlayerTile player={user} />}
        <Stack p={[5, 8]}>
          <MetaButton
            as="a"
            href="//discord.gg/metagame"
            target="_blank"
            px={20}
            py={8}
            fontSize="xl"
          >
            <Image mr={3} boxSize={9} src={discord} />
            Play
          </MetaButton>
          <MetaButton
            as="a"
            href="/dashboard"
            px={20}
            py={8}
            mt={{
              base: '0.5rem !important',
              md: '2rem !important',
            }}
            fontSize="xl"
          >
            Explore
          </MetaButton>
          <MetaButton
            as="a"
            href="//my.metagame.wtf/players"
            px={20}
            py={8}
            mt={{
              base: '0.5rem !important',
              md: '2rem !important',
            }}
            fontSize="xl"
          >
            Roster
          </MetaButton>
          <MetaLink
            mt="3rem !important"
            fontSize={25}
            align="center"
            href="//https://metagame.substack.com/?utm_source=discover_search"
          >
            Substack
          </MetaLink>
        </Stack>
      </Stack>
    </FlexContainer>
  );
};
