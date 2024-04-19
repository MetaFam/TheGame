import { EAS, SchemaEncoder, SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { useEffect, useState } from 'react';

import { useEthersProvider } from './useEthersProvider';
import { useWeb3 } from './useWeb3';

// EAS Schema https://optimism.easscan.org/schema/view/0x944254bc2b52a25515e74ee1c0c17bc8aca8af100b07f8484c48fff90334585e

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0x944254bc2b52a25515e74ee1c0c17bc8aca8af100b07f8484c48fff90334585e";
const eas = new EAS(easContractAddress);

export const useEAS = () => {
  const [connectedEAS, setConnectedEAS] = useState<EAS | null>(null);
  const provider = useEthersProvider({ chainId: 10 });
  const { address } = useWeb3();

  useEffect(() => {
    const connectEAS = async () => {
      const signer = await provider?.getSigner();
      if (signer) {
        eas.connect(signer);
      }
      setConnectedEAS(eas);
    }
    connectEAS();
  }, [provider]);

  const attest = async (message: string, attestee: string, xp?: number) => {
    if (!address) return;
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("address attestee,address attestor,string attestation,uint256 xp");
    const encodedData = schemaEncoder.encodeData([
      { name: "attestee", value: attestee, type: "address" },
      { name: "attestor", value: address, type: "address" },
      { name: "attestation", value: message, type: "string" },
      { name: "xp", value: BigInt(xp ?? 0), type: "uint256" }
    ]);
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",
        expirationTime: BigInt(0),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    return newAttestationUID;
  };

  const getAttestations = async () => {
    async function fetchData() {
      // Define the GraphQL query
      const query = `
        query Attestations {
          attestations(
            where: { schemaId: { equals: "0x944254bc2b52a25515e74ee1c0c17bc8aca8af100b07f8484c48fff90334585e" } }
            take: 25
          ) {
            id
            attester
            recipient
            refUID
            revocable
            revocationTime
            expirationTime
            data
            schemaId
          }
        }
      `;
    
      // Define the GraphQL endpoint
      const endpoint = 'https://optimism.easscan.org/graphql';
    
      try {
        // Send POST request with fetch
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
    
        // Parse response JSON
        const responseData = await response.json();
    
        // Output the received data
        console.log(responseData);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
      }
    }
    
    // Call the function to fetch data
    fetchData();
    
  }

  return { connectedEAS, attest, getAttestations };
};
