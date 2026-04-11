import { CAR } from '@ucanto/core';
import { importDAG } from '@ucanto/core/delegation';
import * as Client from '@web3-storage/w3up-client';
import { CONFIG } from 'config';
import { useEffect, useState } from 'react';

export function useW3upClient() {
  const [w3upClient, setW3upClient] = useState<Client.Client | null>(null);
  const { web3StorageDID } = CONFIG;

  useEffect(() => {
    if (!web3StorageDID) return;

    async function fetchW3upClient() {
      try {
        const response = await fetch('/api/w3up-delegate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ did: web3StorageDID }),
        });

        if (!response.ok) {
          throw new Error(`Delegation request failed: ${response.status}`);
        }

        const { delegation: base64 } = await response.json();
        const car = CAR.decode(Buffer.from(base64, 'base64'));
        const delegation = await importDAG(car.blocks.values());

        const client = await Client.create();
        await client.addSpace(delegation);

        setW3upClient(client);
      } catch (error) {
        console.error('Error occurred during delegation:', error);
      }
    }

    fetchW3upClient();
  }, [web3StorageDID]);

  return w3upClient;
}
