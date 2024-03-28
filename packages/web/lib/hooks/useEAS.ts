import { EAS, Offchain, SchemaEncoder, SchemaRegistry, TransactionSigner } from "@ethereum-attestation-service/eas-sdk";
import { useEthersSigner } from "./userEthersSigner";
import { useEffect, useState } from "react";

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26


export const useEAS = () => {
  const [easO, setEasO] = useState<EAS | null>(null);
  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);
  const provider = useEthersSigner();
  
  useEffect(() => {
    if (!provider) return;
    console.log("Provider", provider)
    eas.connect(provider as unknown as TransactionSigner);
    console.log("EAS", eas)
    setEasO(eas);
  }, [provider])
  // Connects an ethers style provider/signingProvider to perform read/write functions.
  // MUST be a signer to do write operations!

  return easO;

}
// Initialize the sdk with the address of the EAS Schema contract address
