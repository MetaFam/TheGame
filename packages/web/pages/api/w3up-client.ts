import { DID, CAR } from "@ucanto/core";
import { importDAG } from "@ucanto/core/delegation";
import * as Signer from "@ucanto/principal/ed25519";
import * as Client from "@web3-storage/w3up-client";
import { StoreMemory } from "@web3-storage/access/stores/store-memory";

const principal = Signer.parse("pLEASE FIX ME");

const initClient = async () => {
  // Add proof that this agent has been delegated capabilities on the space
  const client = await Client.create({ principal, store: new StoreMemory() });
  const space = client.spaces().find((space) => space.name === "metagame");
  if (!space) {
    const proof = parseProof("ahhhhh");
    const space = await client.addSpace(proof);
    await client.setCurrentSpace(space.did());
  }
  return client;
};

/**data is a Base64 encoded CAR file */
function parseProof(data: string) {
  const car = CAR.decode(Buffer.from(data, "base64"));
  return importDAG(car.blocks.values());
}

export const delegate = async (did: any) => {
  // Create a delegation for a specific DID
  const audience = DID.parse(did);
  const client = await initClient();
  const delegation = await client.createDelegation(
    audience,
    ["store/add", "upload/add", "upload/remove", "store/remove"],
    { lifetimeInSeconds: 60 * 60 * 24 },
  );
  // Serializing the delegation before sending it to the client
  return [(await delegation.archive()).ok, client];
}