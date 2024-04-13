import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { useEffect, useState } from 'react';

import { useEthersProvider } from './useEthersProvider';

// EAS Schema https://optimism.easscan.org/schema/view/0x081fc803f607b291b727b885a203d53b8cbb1488f6db1242327cca81db5f17ed

const easContractAddress = '0x4200000000000000000000000000000000000021';
const schemaUID =
  '0x081fc803f607b291b727b885a203d53b8cbb1488f6db1242327cca81db5f17ed';
const eas = new EAS(easContractAddress);

export const useEAS = () => {
  const [connectedEAS, setConnectedEAS] = useState<EAS | null>(null);
  const provider = useEthersProvider({ chainId: 10 });

  useEffect(() => {
    console.log("Provider", provider?.getSigner());
    const connectEAS = async () => {
      const signer = await provider?.getSigner();
      if (signer) {
        eas.connect(signer);
      }
      setConnectedEAS(eas);
    }
    connectEAS();
  }, [provider]);

  const attest = async (message: string, context: string) => {
    //    // Initialize SchemaEncoder with the schema string
    // const schemaEncoder = new SchemaEncoder("string message,string context");
    //   const encodedData = schemaEncoder.encodeData([
    //     { name: "message", value: message, type: "string" },
    //     { name: "context", value: context, type: "string" }
    //   ]);
    //   const tx = await eas.attest({
    //     schema: schemaUID,
    //     data: {
    //       recipient: "0x0000000000000000000000000000000000000000",
    //       expirationTime: 0 as unknown as bigint,
    //       revocable: true, // Be aware that if your schema is not revocable, this MUST be false
    //       data: encodedData,
    //     },
    //   });
    //   const newAttestationUID = await tx.wait();
  };

  return { connectedEAS, attest };
};
