import { Box, Button, MetaButton, Text } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { Web3Context } from 'contexts/Web3Context';
import React, { useCallback, useContext } from 'react';

const formatAddress = (address = '') =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const LoginButton: React.FC = () => {
  const { connectWeb3, disconnect, isConnected, address } = useContext(
    Web3Context,
  );

  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);

  return (
    <Box>
      {isConnected ? (
        <Box>
          <Text fontFamily="body" color="whiteAlpha.700">
            {formatAddress(address)}
          </Text>
          <Box>
            <MetaLink href="/profile/setup">Setup profile</MetaLink> |{' '}
            <Button
              onClick={disconnect}
              fontFamily="body"
              color="cyan.400"
              variant="link"
            >
              Disconnect
            </Button>
          </Box>
        </Box>
      ) : (
        <MetaButton size="md" px={8} onClick={handleLoginClick}>
          Connect wallet
        </MetaButton>
      )}
    </Box>
  );
};
