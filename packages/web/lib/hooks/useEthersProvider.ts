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
  const provider = (
    new ethers.BrowserProvider(transport, network) as
    ethers.BrowserProvider & { request: (args: { method: string, params: Array<unknown> }) => void }
  )
  provider.request = async ({ method, params }: { method: string, params: Array<unknown>}) => {
    const response = await provider.send(method, params ?? [])
    console.debug({ req: method, params, response })
    return response
  }
  return provider;
}

export function useViemClients({
  chain = optimism,
}: { chain?: Chain } = {}) {
  const clients = useMemo(
    () => ({
      public: createPublicClient({
        chain,
        transport: http(),
      }),
      mainnet: createPublicClient({
        chain: mainnet,
        transport: http(),
      }),
      get wallet() {
        if(!window.ethereum) {
          throw new Error('No `window.ethereum`.')
        }
        return createWalletClient({
          chain,
          transport: custom(window.ethereum),
        })
      }
    }),
    [chain],
  );
  
  return clients;
}

export function useEthersProvider({
  chain = optimism,
}: { chain?: Chain } = {}) {
  const clients = useViemClients({ chain });
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  useEffect(() => {
    const getProvider = async () => {
      if (clients.wallet) {
        setProvider(await clientToProvider(clients.wallet));
      }
    };
    getProvider();
  }, [clients]);
  return provider;
}
