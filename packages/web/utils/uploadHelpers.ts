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
