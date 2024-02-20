import {
  Button,
  MetaButton,
  Spinner,
  Tooltip,
  useBreakpointValue,
  useToast,
} from '@metafam/ds';
import { useWeb3 } from 'lib/hooks';
import React from 'react';

export const LandingConnectButton = ({ isIconStyle = false, ...props }) => {
  const {
    connect,
    disconnect,
    connected,
    connecting,
    address,
  } = useWeb3();
  const spinnerSize = useBreakpointValue({ base: 'sm', '2xl': 'md' });
  const toast = useToast();

  return (
    <Tooltip
      label={
        connected
          ? 'Change to Polygon network 👆'
          : `${connected ? 'Disconnect' : 'Connect'} wallet`
      }
      hasArrow
      placement="bottom"
    >
      {!isIconStyle ? (
        <Button
          onClick={connected ? disconnect : connect}
          variant="ghost"
          aria-label="Connect to Web3 wallet"
          isDisabled={connecting}
          size={'xl'}
        >
          {connecting && <Spinner size="sm" />}
          {!connecting && connected ? 'Connected' : 'Connect'}
        </Button>
      ) : (
        <Button
          onClick={connected ? disconnect : connect}
          variant="ghost"
          display="inline-flex"
          alignItems="center"
          fontWeight="normal"
          borderRadius="inherit inherit 0 0"
          opacity={0.3}
          px={{ base: 1, xl: 2 }}
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'var(--chakra-colors-landing300)',
              opacity: 1,
              svg: {
                filter: 'drop-shadow(0 0 10px var(--chakra-colors-landing300))',
              },
            },
          }}
          {...props}
        >
          {connecting ? (
            <Spinner size={spinnerSize} />
          ) : (
            <MetaButton backgroundColor={'#0000000'}>
              {
                address ? `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}` : "connect"
              }
            </MetaButton>
          )}
        </Button>
      )}
    </Tooltip>
  );
};
