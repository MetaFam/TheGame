import { CAR, DID } from '@ucanto/core';
import { importDAG } from '@ucanto/core/delegation';
import * as Signer from '@ucanto/principal/ed25519';
import { StoreMemory } from '@web3-storage/access/stores/store-memory';
import * as Client from '@web3-storage/w3up-client';

const principal =
  process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY &&
  Signer.parse(process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY);

const initClient = async () => {
  if (!principal) {
    throw new Error('WEB3_STORAGE_KEY must be set');
  }
  // Add proof that this agent has been delegated capabilities on the space, load space if exists
  const client = await Client.create({ principal, store: new StoreMemory() });
  const space = client.spaces().find((s) => s.name === 'metagame');
  if (!space) {
    const proof = parseProof(process.env.NEXT_PUBLIC_WEB3_STORAGE_PROOF || '');
    const spaceProof = await client.addSpace(proof);
    await client.setCurrentSpace(spaceProof.did());
  }
  return client;
};

/** data is a Base64 encoded CAR file */
function parseProof(data: string) {
  const car = CAR.decode(Buffer.from(data, 'base64'));
  return importDAG(car.blocks.values());
}

export const delegate = async (did: any) => {
  // Create a delegation for a specific DID
  const audience = DID.parse(did);
  const client = await initClient();
  const delegation = await client.createDelegation(
    audience,
    ['store/add', 'upload/add', 'upload/remove', 'store/remove'],
    { lifetimeInSeconds: 60 * 60 * 24 },
  );
  // Serializing the delegation before sending it to the client
  return [(await delegation.archive()).ok, client];
};
