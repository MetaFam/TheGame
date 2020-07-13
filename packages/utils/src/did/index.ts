import { ethers } from 'ethers';
import { Web3Provider } from 'ethers/providers';
import { Base64 } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';

const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createToken(provider: Web3Provider) {
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
  const proof = await signer.signMessage(serializedClaim);

  const DIDToken = Base64.encode(JSON.stringify([proof, serializedClaim]));

  return DIDToken;
}

export function getSignerAddress(token: string): any {
  try {
    const rawToken = Base64.decode(token);
    const [proof, rawClaim] = JSON.parse(rawToken);
    const signerAddress = ethers.utils.verifyMessage(rawClaim, proof);
    return signerAddress;
  } catch (e) {
    console.error('Token verification failed', e);
    return null;
  }
}

export function verifyToken(token: string): any {
  try {
    const rawToken = Base64.decode(token, 'base64');
    const [proof, rawClaim] = JSON.parse(rawToken);
    const claim = JSON.parse(rawClaim);

    const signerAddress = ethers.utils.verifyMessage(rawClaim, proof);
    if (signerAddress !== claim.iss) {
      return null;
    }
    return claim;
  } catch (e) {
    console.error('Token verification failed', e);
    return null;
  }
}
