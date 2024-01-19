import { Client } from "@web3-storage/w3up-client";
import { CONFIG } from "config";
import { delegate } from "pages/api/w3up-client";
import { useEffect,useState } from "react";

export function useW3upClient() {
  const [w3upClient, setW3upClient] = useState<Client | null>(null);
  const { web3StorageDID } = CONFIG;
  useEffect(() => {
    if (!web3StorageDID) return;
    async function fetchW3upClient() {
      try {
        const result = await delegate(web3StorageDID);
        if (result) {
          setW3upClient(result[1] as Client);
        }
      } catch (error) {
        console.error('Error occurred during delegation:', error);
      }
    }

    fetchW3upClient();
  }, [web3StorageDID]);

  return w3upClient;
}