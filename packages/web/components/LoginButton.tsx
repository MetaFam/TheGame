import { MetaButton, Spinner } from '@metafam/ds';
import React, { useCallback } from 'react';

import { useUser, useWeb3 } from '../lib/hooks';

export const LoginButton: React.FC = () => {
  const { connectWeb3, isConnected, isConnecting } = useWeb3();

  const { user, fetching } = useUser({ forLoginDisplay: true });

  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);

  if (fetching || isConnecting) {
    return <Spinner color="purple.500" size="sm" />;
  }

  if (isConnected && !user?.player) return null;

  return (
    <MetaButton
      w="100%"
      mx={4}
      my={3.5}
      fontFamily="exo2"
      maxWidth={{ sm: '480px' }}
      size="md"
      px={8}
      onClick={handleLoginClick}
    >
      Connect Wallet
    </MetaButton>
  );
};
