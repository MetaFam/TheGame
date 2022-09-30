import { providers } from 'ethers';
import { Base64 } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';

import { getSignature, verifySignature } from '../ethereumHelper';
import { Maybe } from '../extendedProfileTypes';

const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

const WELCOME_MESSAGE = `Welcome to MetaGame Anon 🐙 \n Please sign this message so we know it is you.\n We care about privacy and assure you, we don't harvest your data. Unless you create a Player account, we simply store a token in your browser's local storage. This can be removed by using the disconnect button.\n `;

type Claim = {
  iat: Date;
  exp: Date;
  iss: string;
  aud: string;
  tid: string;
};

export async function createToken(
  provider: providers.Web3Provider,
): Promise<string> {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const iat = +new Date();

  const claim = {
    iat,
    exp: iat + tokenDuration,
    iss: address,
    aud: 'the-game',
    tid: uuidv4(),
  };

  const serializedClaim = JSON.stringify(claim);
  const msgToSign = `${WELCOME_MESSAGE}${serializedClaim}`;
  const proof = await getSignature(provider, msgToSign);

  return Base64.encode(JSON.stringify([proof, serializedClaim]));
}

export async function verifyToken(
  token: string,
  provider: providers.JsonRpcProvider,
  connectedAddress?: string,
): Promise<Maybe<Claim>> {
  const rawToken = Base64.decode(token, 'base64');
  const [proof, rawClaim] = JSON.parse(rawToken);
  const claim: Claim = JSON.parse(rawClaim);
  const claimant = claim.iss;

  if (connectedAddress != null && claimant !== connectedAddress) {
    throw new Error(
      `Connected address (${connectedAddress}) ≠ claim issuer (${claimant}).`,
    );
  }

  const msgToVerify = `${WELCOME_MESSAGE}${rawClaim}`;
  const valid = await verifySignature(claimant, msgToVerify, proof, provider);

  if (!valid) {
    throw new Error('Invalid Signature');
  }

  return claim;
}
