import { EAS, SchemaEncoder, SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { useEffect, useState } from 'react';

import { useEthersProvider } from './useEthersProvider';
import { useWeb3 } from './useWeb3';

// EAS Schema https://optimism.easscan.org/schema/view/0x081fc803f607b291b727b885a203d53b8cbb1488f6db1242327cca81db5f17ed

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
  };

  return { connectedEAS, attest };
};
