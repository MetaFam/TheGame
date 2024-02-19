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
import { ConnectKitButton } from "connectkit";

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
      <ConnectKitButton />
    </Tooltip>
  );
};
