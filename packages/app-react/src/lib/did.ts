import { v4 as uuidv4 } from 'uuid';

const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createToken(provider) {
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

  const DIDToken = btoa(JSON.stringify([proof, serializedClaim]));

  return DIDToken;
}
