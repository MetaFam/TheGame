import { MetaButton, MetaMaskIcon, Text } from '@metafam/ds';
import { useWeb3 } from 'lib/hooks';
import { useCallback, useState } from 'react';
import { switchChainOnMetaMask } from 'utils/metamask';
import { NETWORK_INFO } from 'utils/networks';

export const SwitchNetworkButton: React.FC<{ chainId?: string }> = ({
  chainId = '0x1',
}) => {
  const { connected, isMetaMask } = useWeb3();
  const networkInfo = NETWORK_INFO[chainId];

  const [isLoading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    if (connected) {
      setLoading(true);
      await switchChainOnMetaMask(chainId);
      setLoading(false);
    }
  }, [connected, chainId]);

  if (!connected || !networkInfo) return null;

  const { name } = networkInfo;

  return isMetaMask ? (
    <MetaButton
      size="sm"
      fontSize="md"
      px={2}
      textTransform="initial"
      leftIcon={<MetaMaskIcon />}
      {...{ isLoading, onClick }}
    >
      {name}
    </MetaButton>
  ) : (
    <Text as="span">{name}</Text>
  );
};
