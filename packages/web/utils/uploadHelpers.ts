export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('ipfsHash', file);

  const result = await fetch(`/api/storage`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  const response = await result.json();
  const { error, ipfsHash } = response;

  if (result.status >= 400 || error || !ipfsHash) {
    const message =
      result.status >= 400 || error
        ? `web3.storage ${result.status} response: "${
            error ?? result.statusText
          }"`
        : `Uploaded logo but didn't get a response back.`;

    throw new Error(message);
  }

  return ipfsHash;
};
