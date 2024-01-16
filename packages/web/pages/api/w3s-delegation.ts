import { CarReader } from '@ipld/car';
import * as DID from '@ipld/dag-ucan/did';
import * as Delegation from '@ucanto/core/delegation';
import type { Block } from '@ucanto/interface';
import { Signer } from '@ucanto/principal/ed25519';
import * as Client from '@web3-storage/w3up-client';
import { CONFIG } from 'config';
import type { NextApiRequest, NextApiResponse } from 'next';

async function w3sDelegation(did: string) {
  if (!CONFIG.web3StorageKey) {
    throw new Error('$WEB3_STORAGE_KEY is not set.');
  }
  const principal = Signer.parse(CONFIG.web3StorageKey);
  console.debug({ principal });
  const client = await Client.create({ principal });

  if (!CONFIG.web3StorageProof) {
    throw new Error('$WEB3_STORAGE_PROOF is not set.');
  }
  const proof = await parseProof(CONFIG.web3StorageProof);
  console.debug({ proof });
  const space = await client.addSpace(proof);
  await client.setCurrentSpace(space.did());
  console.debug({ space: space.did().toString(), audience: did })
console.debug('proof parse', proof, space.did())
  const audience = DID.parse(did);
  const abilities = ['store/add', 'upload/add'];
  const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours from now
  const delegation = await client.createDelegation(audience, abilities, {
    expiration,
  });
  const archive = await delegation.archive();
  console.debug({ archive, ok: archive.ok });
  return archive.ok;
}

/** @param {string} data Base64 encoded CAR file */
async function parseProof(proof: string) {
  console.debug({ proof });
  const blocks = [];
  const reader = await CarReader.fromBytes(Buffer.from(proof, 'base64'));
  // eslint-disable-next-line no-restricted-syntax
  for await (const block of reader.blocks()) {
    blocks.push(block as Block<unknown, number, number, 1>);
  }
  console.debug({ blocks });
  return Delegation.importDAG(blocks);
}

export const handler: (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>,
) => Promise<void> = async (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>,
) => {
  try {
    const { did } = req.body;
    if (!did) {
      throw new Error('Missing `did` in request body.');
    }
    console.debug({ did });
    const ucan = await w3sDelegation(did);
    if (!ucan) {
      throw new Error(`No UCAN generated for "${did}".`);
    }
    console.debug({ ucan });
    //@ts-ignore
    res.status(201).send(ucan);
  } catch (error) {
    console.error({ 'error generating W3S UCAN': error });
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
