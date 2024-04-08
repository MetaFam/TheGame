import  { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";
import { TransactionSigner } from "@ethereum-attestation-service/eas-sdk";
import { useEthersSigner } from "./userEthersSigner";
import { useEffect, useState } from "react";

// EAS Schema https://optimism.easscan.org/schema/view/0x081fc803f607b291b727b885a203d53b8cbb1488f6db1242327cca81db5f17ed

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0x081fc803f607b291b727b885a203d53b8cbb1488f6db1242327cca81db5f17ed";
const eas = new EAS(easContractAddress, "https://optimism.easscan.org");

export const useEAS = () => {
  const [connectedEAS, setConnectedEAS] = useState<EAS | null>(null);
  const provider = useEthersSigner({ chainId: 10 });

  useEffect(() => {
    const connectEAS = async () => {
      if (provider) {
        eas.connect(provider);
      }
      setConnectedEAS(eas);
    }
    connectEAS();
  }, [provider])

  const attest = async (message: string, context: string) => {
     // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("string message,string context");
    const encodedData = schemaEncoder.encodeData([
      { name: "message", value: message, type: "string" },
      { name: "context", value: context, type: "string" }
    ]);
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",
        expirationTime: 0 as unknown as bigint,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID);
  }

  return { connectedEAS, attest };
}
