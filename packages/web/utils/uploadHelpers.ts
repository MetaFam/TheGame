import * as Delegation from '@ucanto/core/delegation';
import * as Client from '@web3-storage/w3up-client';

async function getW3SClient() {
  const client = await Client.create();

  const response = await fetch('/api/w3s-delegation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ did: client.did().toString() }),
  });
  const raw = await response.arrayBuffer();
  const delegation = await Delegation.extract(new Uint8Array(raw));
  if (!delegation.ok) {
    throw new Error('Failed to extract delegation', {
      cause: delegation.error,
    });
  }

  const space = await client.addSpace(delegation.ok);
  client.setCurrentSpace(space.did());

  return client;
}

export const uploadFile = async (file: File) => {
  const client = await getW3SClient();
  return client.uploadFile(file);
};

export const uploadFiles = async (files: Array<File>) => {
  const client = await getW3SClient();
  return client.uploadDirectory(files);
};
