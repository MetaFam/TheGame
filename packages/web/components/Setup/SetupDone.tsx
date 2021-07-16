import { MetaButton, MetaHeading, Stack } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerTile } from 'components/Player/PlayerTile';
import { useUser } from 'lib/hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const SetupDone: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
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
          onClick={() => {
            setLoading(true);
            router.push('/');
          }}
          px={20}
          py={8}
          fontSize="xl"
          isLoading={loading}
        >
          Play
        </MetaButton>
      </Stack>
    </FlexContainer>
  );
};
