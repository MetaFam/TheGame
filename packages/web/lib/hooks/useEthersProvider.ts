import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import {
  type Chain,
  type Client,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from 'viem';
import { mainnet, optimism } from 'viem/chains';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

export function clientToProvider(client: Client) {
  const { chain, transport } = client;
  if (!chain) throw new Error('No chain found in Viem client.');
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: mainnet.contracts.ensRegistry.address,
  };
  return new ethers.BrowserProvider(transport, network);
}

export function useEthersProvider({
  chain = optimism,
}: { chain?: Chain } = {}) {
  const clients = useMemo(
    () => ({
      public: createPublicClient({
        chain,
        transport: http(),
      }),
      wallet: createWalletClient({
        chain,
        transport: custom(window.ethereum),
      }),
      mainnet: createPublicClient({
        chain: mainnet,
        transport: http(),
      }),
    }),
    [chain],
  );
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  useEffect(() => {
    const getProvider = async () => {
      if (clients.public) {
        setProvider(await clientToProvider(clients.public));
      }
    };
    getProvider();
  }, [clients]);
  return { provider, clients };
}
