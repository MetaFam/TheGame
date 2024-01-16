import * as Delegation from '@ucanto/core/delegation';
import * as Client from '@web3-storage/w3up-client';

async function getW3SClient() {
  const client = await Client.create();
  const response = await fetch('/api/w3s-delegation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ did: client.did().toString() }),
  });
  console.log('response', response)
  const raw = await response.arrayBuffer();
  console.log('raw', raw);
  const delegation = await Delegation.extract(new Uint8Array(raw));
  console.log('delegation', delegation);
  if (!delegation.ok) {
    throw new Error('Failed to extract delegation', {
      cause: delegation.error,
    });
  }

  const space = await client.addSpace(delegation.ok);
  client.setCurrentSpace(space.did());
  console.log('space', space);
  return client;
}

export const uploadFile = async (file: File) => {
  console.log(file, 'file')
  const client = await getW3SClient();
  return client.uploadFile(file);
};

export const uploadFiles = async (files: Array<File>) => {
  const client = await getW3SClient();
  return client.uploadDirectory(files);
};