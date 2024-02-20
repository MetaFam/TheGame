import {
  Tooltip,
} from '@metafam/ds';
import React from 'react';
import { ConnectKitButton } from "connectkit";
import { useAccount } from 'wagmi';

export const LandingConnectButton = ({ isIconStyle = false, ...props }) => {
  const { isConnected } = useAccount();

  return (
    <Tooltip
      label={
        isConnected
          ? 'Change to Polygon network 👆'
          : `${isConnected ? 'Disconnect' : 'Connect'} wallet`
      }
      hasArrow
      placement="bottom"
    >
      <ConnectKitButton />
    </Tooltip>
  );
};
