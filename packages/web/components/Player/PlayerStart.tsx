import { LoadingState } from '@metafam/ds';
import { ConnectToProgress } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { useUser, useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

export const PlayerStart: React.FC = () => {
  const router = useRouter();
  const { connected, chainId } = useWeb3();
  const { user, fetching } = useUser();
  const newUser = useMemo(() => {
    if (connected && !fetching && !!user) {
      const timeSinceCreation =
        new Date().getTime() - Date.parse(user.createdAt);
      // user is new if player was created less than 5 min ago

      return (
        Number.isNaN(timeSinceCreation) || timeSinceCreation < 5 * 60 * 1000
      );
    }
    return true;
  }, [connected, user, fetching]);

  const canRedirect = useMemo(
    () => connected && !fetching && chainId === '0x1',
    [connected, fetching, chainId],
  );

  useEffect(() => {
    if (canRedirect) {
      // redirect existing users to profile complete
      router.push(newUser ? '/profile/setup' : '/profile/setup/complete');
    }
  }, [newUser, router, canRedirect]);

  return (
    <FlexContainer my="auto">
      {canRedirect ? (
        <LoadingState color="white" />
      ) : (
        <ConnectToProgress showNote showSwitchButton />
      )}
    </FlexContainer>
  );
};
