import { providers, utils } from 'ethers';
import { Base64 } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';

import { signerHelper } from '../ethereumHelper';

const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

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
    iat: +new Date(),
    exp: iat + tokenDuration,
    iss: address,
    aud: 'the-game',
    tid: uuidv4(),
  };

  const serializedClaim = JSON.stringify(claim);
  const proof = await signerHelper(provider, serializedClaim);

  return Base64.encode(JSON.stringify([proof, serializedClaim]));
}

export function getSignerAddress(token: string): string | null {
  try {
    const rawToken = Base64.decode(token);
    const [proof, rawClaim] = JSON.parse(rawToken);
    return utils.verifyMessage(rawClaim, proof);
  } catch (e) {
    console.error('Token verification failed', e);
    return null;
  }
}

export function verifyToken(token: string): Claim | null {
  try {
    const rawToken = Base64.decode(token, 'base64');
    const [proof, rawClaim] = JSON.parse(rawToken);
    const claim: Claim = JSON.parse(rawClaim);

    const signerAddress = utils.verifyMessage(rawClaim, proof);
    if (signerAddress !== claim.iss) {
      return null;
    }
    return claim;
  } catch (e) {
    console.error('Token verification failed', e);
    return null;
  }
}
