import { providers } from 'ethers';

export async function signerHelper(
  provider: providers.Web3Provider,
  rawMessage: string,
) {
  const ethereum = provider.provider;
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (!ethereum.request) throw new Error('invalid ethereum provider');

  let params = [rawMessage, address.toLowerCase()];
  if (ethereum.isMetaMask) {
    params = [params[1], params[0]];
  }
  const signature = await ethereum.request({
    method: 'personal_sign',
    params,
  });
  return signature;
}
