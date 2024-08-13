import { signMessage, verifyMessage } from '@wagmi/core';
import { Base64 } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';
import { PublicClient, WalletClient } from 'viem';

import { Maybe } from '../extendedProfileTypes.js';

const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

const WELCOME_MESSAGE = `Welcome to MetaGame Anon 🐙\n\nPlease sign this message so we know it is you.\n\nWe care about privacy and assure you, we don't harvest your data. Unless you create a Player account, we simply store a token in your browser's local storage. This can be removed by using the disconnect button.\n\n`;

type Claim = {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  tid: string;
};

export async function createToken(
  { client, account }: { client: WalletClient, account: `0x${string}` }
) {
  const iat = new Date().getTime();

  if(!account) {
    throw new Error('No account found in Viem signing client.')
  }

  const claim: Claim = {
    iat,
    exp: iat + tokenDuration,
    iss: account,
    aud: 'the-game',
    tid: uuidv4(),
  };

  const serializedClaim = JSON.stringify(claim);
  const message = `${WELCOME_MESSAGE}${serializedClaim}`;
  const proof = await client.signMessage({ account, message });

  return Base64.encode(JSON.stringify([proof, serializedClaim]));
}

export async function verifyToken({
  token, /*connectedAddress,*/ publicClient,
}: {
  token: string,
  // connectedAddress?: string,
  publicClient: PublicClient,
}): Promise<Maybe<Claim>> {
  const rawToken = Base64.decode(token);
  const [proof, rawClaim] = JSON.parse(rawToken);
  const claim: Claim = JSON.parse(rawClaim);
  const { iss: claimant } = claim;

  // if (connectedAddress != null && claimant !== connectedAddress) {
  //   throw new Error(
  //     `Connected address (${connectedAddress}) ≠ claim issuer (${claimant}).`,
  //   );
  // }

  const message = `${WELCOME_MESSAGE}${rawClaim}`;
  const valid = await publicClient.verifyMessage({
    address: claimant as `0x${string}`,
    message,
    signature: proof,
  });

  if (!valid) throw new Error('Invalid token signature.');

  return claim;
}
