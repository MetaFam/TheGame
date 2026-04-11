import type { NextApiRequest, NextApiResponse } from 'next';

import { CAR, DID } from '@ucanto/core';
import { importDAG } from '@ucanto/core/delegation';
import * as Signer from '@ucanto/principal/ed25519';
import { StoreMemory } from '@web3-storage/access/stores/store-memory';
import * as Client from '@web3-storage/w3up-client';

const principal =
  process.env.WEB3_STORAGE_KEY &&
  Signer.parse(process.env.WEB3_STORAGE_KEY);

const initClient = async () => {
  if (!principal) {
    throw new Error('WEB3_STORAGE_KEY must be set');
  }
  const client = await Client.create({ principal, store: new StoreMemory() });
  const space = client.spaces().find((s) => s.name === 'metagame');
  if (!space) {
    const proof = parseProof(process.env.WEB3_STORAGE_PROOF || '');
    const spaceProof = await client.addSpace(proof);
    await client.setCurrentSpace(spaceProof.did());
  }
  return client;
};

function parseProof(data: string) {
  const car = CAR.decode(Buffer.from(data, 'base64'));
  return importDAG(car.blocks.values());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { did } = req.body;
  if (!did || typeof did !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid DID' });
  }

  try {
    const audience = DID.parse(did);
    const client = await initClient();
    const delegation = await client.createDelegation(
      audience,
      ['store/add', 'upload/add', 'upload/remove', 'store/remove'],
      { lifetimeInSeconds: 60 * 60 * 24 },
    );
    const archive = await delegation.archive();
    if (!archive.ok) {
      return res.status(500).json({ error: 'Failed to archive delegation' });
    }
    const base64 = Buffer.from(archive.ok).toString('base64');
    return res.status(200).json({ delegation: base64 });
  } catch (error) {
    console.error('Delegation error:', error);
    return res.status(500).json({ error: 'Delegation failed' });
  }
}
