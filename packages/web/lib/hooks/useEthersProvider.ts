import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { Config, useConnectorClient } from 'wagmi';

export function clientToProvider(client: Client<Transport, Chain, Account>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new ethers.providers.Web3Provider(transport, network);
  return provider;
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  useEffect(() => {
    const getProvider = async () => {
      if (client) {
        setProvider(await clientToProvider(client));
      }
    };
    getProvider();
  }, [client]);
  return provider;
}
