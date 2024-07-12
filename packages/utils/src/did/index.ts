import { signMessage, verifyMesage } from '@wagmi/core';
import { ethers } from 'ethers';
import { Base64 } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';

import { verifySignature } from '../ethereumHelper.js';
import { Maybe } from '../extendedProfileTypes.js';

const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

const WELCOME_MESSAGE = `Welcome to MetaGame Anon 🐙\n\nPlease sign this message so we know it is you.\n\nWe care about privacy and assure you, we don't harvest your data. Unless you create a Player account, we simply store a token in your browser's local storage. This can be removed by using the disconnect button.\n\n`;

type Claim = {
  iat: Date;
  exp: Date;
  iss: string;
  aud: string;
  tid: string;
};

export async function createToken(userAddress: string) {
  const iat = +new Date();

  const claim = {
    iat,
    exp: iat + tokenDuration,
    iss: userAddress,
    aud: 'the-game',
    tid: uuidv4(),
  };

  const serializedClaim = JSON.stringify(claim);
  const msgToSign = `${WELCOME_MESSAGE}${serializedClaim}`;
  const proof = await signMessage(msgToSign);

  return Base64.encode(JSON.stringify([proof, serializedClaim]));
}

export async function verifyToken(
  token: string,
  provider: ethers.BrowserProvider,
  connectedAddress?: string,
): Promise<Maybe<Claim>> {
  const rawToken = Base64.decode(token);
  const [proof, rawClaim] = JSON.parse(rawToken);
  const claim: Claim = JSON.parse(rawClaim);
  const { iss: claimant } = claim;

  if (connectedAddress != null && claimant !== connectedAddress) {
    throw new Error(
      `Connected address (${connectedAddress}) ≠ claim issuer (${claimant}).`,
    );
  }

  const msgToVerify = `${WELCOME_MESSAGE}${rawClaim}`;
  const valid = await verifySignature(claimant, msgToVerify, proof);

  if (!valid) {
    throw new Error('Invalid Signature');
  }

  return claim;
}
