import { Contract, ethers } from 'ethers';

export async function getSignature(
  provider: ethers.BrowserProvider,
  msg: string,
): Promise<string> {
  const signer = await provider.getSigner();
  return signer.signMessage(msg);
}

const smartWalletABI = [
  'function isValidSignature(bytes32 _message, bytes _signature) public view returns (bool)',
];

enum WalletType {
  EOA,
  SMART,
}

async function getWalletType(
  address: string,
  provider: ethers.BrowserProvider,
): Promise<WalletType> {
  const code = await new Promise((resolve, reject) => {
    const seconds = 45;
    const id = setTimeout(() => {
      reject(new Error(`\`.getCode\` Timed Out After ${seconds}s`));
    }, seconds * 1000);
    provider
      .getCode(address)
      .then((c) => {
        clearTimeout(id);
        resolve(c);
      })
      .catch((err) => {
        console.error('`.getCode` Error', { err });
        reject(err);
      });
  });
  return code === '0x' ? WalletType.EOA : WalletType.SMART;
}

export async function verifySignature(
  address: string,
  message: string,
  signature: string,
  provider: ethers.BrowserProvider,
): Promise<boolean> {
  const walletType = await getWalletType(address, provider);

  if (walletType === WalletType.EOA) {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return address === recoveredAddress;
  }

  // Smart wallet
  const msgBytes = ethers.toUtf8Bytes(message);
  const hexMsg = ethers.hexlify(msgBytes);
  const hexArray = ethers.toBeArray(hexMsg);
  const hashMsg = ethers.hashMessage(hexArray);

  const contract = new Contract(address, smartWalletABI, provider);
  try {
    return contract.isValidSignature(hashMsg, signature);
  } catch (error) {
    throw new Error(`Unsupported Smart Wallet: ${(error as Error).message}`);
  }
}
