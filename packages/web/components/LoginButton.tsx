import { Box, Button, HStack, MetaButton, Text } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { Web3Context } from 'contexts/Web3Context';
import React, { useCallback, useContext } from 'react';

import { formatAddress } from '../utils/playerHelpers';

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
          <HStack spacing={2}>
            <MetaLink href="/profile/setup">Setup profile</MetaLink>
            <Text color="cyan.400">|</Text>
            <Button
              onClick={disconnect}
              fontFamily="body"
              color="cyan.400"
              variant="link"
              fontWeight="normal"
            >
              Disconnect
            </Button>
          </HStack>
        </Box>
      ) : (
        <MetaButton size="md" px={8} onClick={handleLoginClick}>
          Connect wallet
        </MetaButton>
      )}
    </Box>
  );
};
