import { NETWORK_INFO } from 'utils/networks';

export const switchChainOnMetaMask = async (
  chainId: string,
): Promise<boolean> => {
  if (!NETWORK_INFO[chainId]) {
    // eslint-disable-next-line no-console
    console.error(`No network configuration found for chainId ${chainId}`);
    return false;
  }

  const { name, symbol, explorer, rpc } = NETWORK_INFO[chainId];

  if (!(name && symbol && rpc && explorer && window.ethereum?.isMetaMask)) {
    // eslint-disable-next-line no-console
    console.error('Switching chain is only supported in Metamask');
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId,
        },
      ],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if ((switchError as { code?: number }).code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId,
              chainName: name,
              nativeCurrency: {
                name: symbol,
                symbol,
                decimals: 18,
              },
              rpcUrls: [rpc],
              blockExplorerUrls: [explorer],
            },
          ],
        });
        return true;
      } catch (addError) {
        // eslint-disable-next-line no-console
        console.error(`Unable to add chainId ${chainId} to metamask`, addError);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error(
        `Unable to switch to chainId ${chainId} on metamask`,
        switchError,
      );
    }
  }
  return false;
};

// ensure that we are on the right chainId before calling this method.
export const addTokenToMetamask = async ({
  address,
  symbol,
  decimals,
}: {
  address: string;
  symbol: string;
  decimals: number;
}): Promise<boolean> => {
  try {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
        },
      },
    });
    return true;
  } catch (addError) {
    // eslint-disable-next-line no-console
    console.error(`Unable to add token ${symbol} to metamask`, addError);
  }
  return false;
};
