import { MetaButton, MetaHeading, Stack } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerTile } from 'components/Player/PlayerTile';
import { useUser } from 'lib/hooks';
import { useRouter } from 'next/router';
import React from 'react';

export const SetupDone: React.FC = () => {
  const router = useRouter();
  const { user } = useUser({ redirectTo: '/' });
  return (
    <FlexContainer flex={1}>
      <MetaHeading mb={10}>Game on!</MetaHeading>

      <Stack
        spacing={8}
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align="center"
      >
        {user?.player && <PlayerTile player={user.player} />}
        <MetaButton
          onClick={() => router.push('/')}
          px={20}
          py={8}
          fontSize="xl"
        >
          Play
        </MetaButton>
      </Stack>
    </FlexContainer>
  );
};
