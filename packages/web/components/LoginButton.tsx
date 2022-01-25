import { MetaButton, Spinner } from '@metafam/ds';
import { useMounted, useWeb3 } from 'lib/hooks';
import React, { useCallback } from 'react';

export const LoginButton: React.FC = () => {
  const { connect, connecting } = useWeb3();
  const mounted = useMounted();

  const handleLoginClick = useCallback(async () => {
    await connect();
  }, [connect]);

  if (!mounted || connecting) {
    return (
      <Spinner color="purple.500" size="md" my={3} thickness="4px" speed="4s" />
    );
  }

  return (
    <MetaButton
      mx={4}
      my={3.5}
      maxWidth={{ sm: '480px' }}
      size="md"
      px={8}
      onClick={handleLoginClick}
    >
      Connect Wallet
    </MetaButton>
  );
};
