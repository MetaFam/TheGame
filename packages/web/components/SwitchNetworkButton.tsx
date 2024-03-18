import { Button, MetaMaskIcon, Tooltip } from '@metafam/ds';
import { useWeb3 } from 'lib/hooks';
import React, { useCallback, useState } from 'react';
import { useSwitchChain } from 'wagmi';
import { NETWORK_INFO } from 'utils/networks';

export const SwitchNetworkButton: React.FC<{ chainId?: string }> = ({
  chainId = '0x1',
}) => {
  const { connected } = useWeb3();
  const networkInfo = NETWORK_INFO[chainId];
  const { switchChain } = useSwitchChain()
  const [isLoading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    if (connected) {
      setLoading(true);
      await switchChain({ chainId: +chainId });
      setLoading(false);
    }
  }, [connected, chainId]);

  if (!connected || !networkInfo) return null;

  const { name } = networkInfo;

  return (
    <Tooltip label="Click to switch network." hasArrow>
      <Button
        size="sm"
        fontSize="md"
        px={2}
        colorScheme="pink"
        leftIcon={<MetaMaskIcon />}
        {...{ isLoading, onClick }}
      >
        Switch to {name}
      </Button>
    </Tooltip>
  );
};
