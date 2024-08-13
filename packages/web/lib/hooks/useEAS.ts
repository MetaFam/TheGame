import {
  EAS,
  SchemaEncoder,
  TransactionSigner,
} from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { useEthersProvider } from '#lib/hooks/useEthersProvider';
import { useWeb3 } from '#lib/hooks/useWeb3';

// EAS Schema https://optimism.easscan.org/schema/view/0xd4c0003240401da8b17fbe710a41e4c8e690a0afef796ab6d5871b69ac15b0d1

const easContractAddress = '0x4200000000000000000000000000000000000021';
const schemaUID =
  '0xd4c0003240401da8b17fbe710a41e4c8e690a0afef796ab6d5871b69ac15b0d1';
const eas = new EAS(easContractAddress);

export const useEAS = () => {
  const [connectedEAS, setConnectedEAS] = useState<EAS | null>(null);
  const provider = useEthersProvider();
  const { address } = useWeb3();

  useEffect(() => {
    const connectEAS = async () => {
      const signer = await provider?.getSigner();
      const txSigner = {
        async estimateGas(tx: ethers.TransactionRequest) {
          const v6TX = tx;
          v6TX.to = tx.to ?? undefined;
          return signer?.estimateGas(v6TX);
        },
        sendTransaction(tx: ethers.TransactionRequest) {
          return signer?.sendTransaction(tx);
        },
        call(tx: ethers.TransactionRequest) {
          return signer?.call(tx);
        },
        resolveName(name: string) {
          return signer?.resolveName(name);
        },
        getAddress() {
          return signer?.getAddress();
        },
      };
      if (signer) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eas.connect(txSigner);
      }
      setConnectedEAS(eas);
    };
    connectEAS();
  }, [provider]);

  const attest = async (message: string, attestee: string, xp?: string) => {
    if (!address) return undefined;
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(
      'string attestation,string timeCreated,string xp',
    );
    const timeRightNow = new Date().toDateString();
    const encodedData = schemaEncoder.encodeData([
      { name: 'attestation', value: message, type: 'string' },
      { name: 'timeCreated', value: timeRightNow, type: 'string' },
      { name: 'xp', value: xp ?? '¿?', type: 'string' },
    ]);
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: attestee,
        expirationTime: BigInt(0),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    return newAttestationUID;
  };

  const getAttestationsForRecipient = async (recipient: string) => {
    async function fetchData() {
      // Define the GraphQL query
      const query = `
        query Attestations($recipient: String!) {
          attestations(
            where: {
              schemaId: { equals: "0xd4c0003240401da8b17fbe710a41e4c8e690a0afef796ab6d5871b69ac15b0d1" }
              recipient: { equals: $recipient }
            }
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
            timeCreated
          }
        }
      `;
      const checkSumAddress = ethers.getAddress(recipient);

      // Define the GraphQL endpoint
      const endpoint = 'https://optimism.easscan.org/graphql';

      try {
        // Send POST request with fetch
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { recipient: checkSumAddress },
          }),
        });

        // Parse response JSON
        const responseData = await response.json();
        const schemaEncoder = new SchemaEncoder(
          'string attestation,string timeCreated,string xp',
        );

        const decodedData = responseData?.data?.attestations.map(
          (attestation: any) =>
            schemaEncoder.decodeData(attestation.data).concat([
              {
                name: 'attester',
                value: attestation.attester,
                signature: '',
                type: 'string',
              },
            ]),
        );
        return decodedData;
      } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        return undefined;
      }
    }

    // Call the function to fetch data
    const data = fetchData();
    return data;
  };

  return { connectedEAS, attest, getAttestationsForRecipient };
};
