import { PublicClient, WalletClient } from 'viem';

export async function getSignature(
  client: WalletClient,
  message: string,
) {
  const account = client.account?.address;
  if(!account) throw new Error('No account found when signing.');
  return client.signMessage({ account, message });
}

export async function verifySignature({
  publicClient,
  address,
  message,
  signature,
}: {
  publicClient: PublicClient,
  address: `0x${string}`,
  message: string,
  signature: `0x${string}`,
}) {
  return publicClient.verifyMessage({ address, message, signature });
}
