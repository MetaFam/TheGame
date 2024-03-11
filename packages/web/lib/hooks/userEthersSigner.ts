import { providers } from 'ethers'
import { useEffect,useMemo, useState } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { Config, useConnectorClient } from 'wagmi'

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  return provider
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  const [provider, setProvider] = useState<providers.Web3Provider | undefined>(undefined)
  useEffect(() => {
    const getProvider = async () => {
      if (client) {
        setProvider(await clientToSigner(client))
      }
    }
    getProvider()
   
  }, [client])
  return provider
}