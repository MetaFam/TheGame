import * as Delegation from '@ucanto/core/delegation';
import * as Client from '@web3-storage/w3up-client';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('ipfsHash', file);

  const { ipfsHash } = await uploadFiles(formData);

  if (!ipfsHash) {
    throw new Error("Uploaded file but didn't get a response back.");
  }

  return ipfsHash;
};

export const uploadFiles = async (formData: FormData) => {
  const result = await fetch(`/api/storage`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  const response = await result.json();
  const { error } = response;

  if (result.status >= 400 || error) {
    throw new Error(
      `web3.storage ${result.status} response: "${error ?? result.statusText}"`,
    );
  }

  return response;
};

export const directUpload = async (files: Array<File>) => {
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

  return client.uploadDirectory(files);
};
