import { Button, MetaMaskIcon, Tooltip } from '@metafam/ds';
import { useWeb3 } from 'lib/hooks';
import React, { useCallback, useState } from 'react';
import { NETWORK_INFO } from 'utils/networks';
import { useSwitchChain } from 'wagmi';

export const SwitchNetworkButton: React.FC<{ chainId?: string }> = ({
  chainId = '0xa',
}) => {
  const { connected } = useWeb3();
  const networkInfo = NETWORK_INFO[chainId];
  const { switchChain } = useSwitchChain();
  const [isLoading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    if (connected) {
      setLoading(true);
      await switchChain({ chainId: Number(chainId) });
      setLoading(false);
    }
  }, [connected, switchChain, chainId]);

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
