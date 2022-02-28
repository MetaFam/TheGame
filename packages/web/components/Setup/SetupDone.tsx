import { MetaButton, MetaHeading, Stack } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerTile } from 'components/Player/PlayerTile';
import { useUser } from 'lib/hooks';
import React from 'react';

export const SetupDone: React.FC = () => {
  const { user } = useUser();
  return (
    <FlexContainer flex={1} mb={8}>
      <MetaHeading mb={10}>Game On!</MetaHeading>

      <Stack
        spacing={8}
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align="center"
      >
        {user && <PlayerTile player={user} />}
        <Stack>
          <MetaButton
            as="a"
            href="//discord.gg/metagame"
            target="_blank"
            px={20}
            py={8}
            fontSize="xl"
          >
            Play
          </MetaButton>
          <MetaButton
            as="a"
            href="/dashboard"
            px={20}
            py={8}
            mt={{
              base: '0.5rem !important',
              md: '5rem !important',
            }}
            fontSize="xl"
          >
            Explore
          </MetaButton>
        </Stack>
      </Stack>
    </FlexContainer>
  );
};
