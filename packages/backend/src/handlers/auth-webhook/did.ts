import { ethers } from "ethers";

export function verifyToken(token: string): any {
  try {
    const rawToken = Buffer.from(token, 'base64').toString();
    const [proof, rawClaim] = JSON.parse(rawToken);
    const claim = JSON.parse(rawClaim);

    const signerAddress = ethers.utils.verifyMessage(rawClaim, proof);
    if(signerAddress !== claim.iss) {
      return null;
    }
    return claim;
  } catch (e) {
    console.error('Token verification failed', e);
    return null;
  }
}
