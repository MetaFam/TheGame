import { NETWORK_INFO } from 'utils/networks';

import { errorHandler } from './errorHandler';

export const switchChain = async (chainId: string): Promise<boolean> => {
  if (!NETWORK_INFO[chainId]) {
    console.error(`No network configuration found for chainId: ${chainId}.`);
    return false;
  }

  const { name, symbol, explorer, rpc } = NETWORK_INFO[chainId];

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
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
        console.error(`Unable to add chainId: ${chainId}.`, addError);
        errorHandler(addError as Error);
      }
    } else {
      console.error(`Unable to switch to chainId: ${chainId}.`, switchError);
      errorHandler(switchError as Error);
    }
  }
  return false;
};

// ensure that we are on the right chain when calling this method.
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
    console.error(`Unable to add token: ${symbol}.`, addError);
    errorHandler(addError as Error);
  }
  return false;
};
