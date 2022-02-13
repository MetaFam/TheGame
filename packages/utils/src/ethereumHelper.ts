import { Contract, providers, utils } from 'ethers';

export async function getSignature(
  provider: providers.Web3Provider,
  msg: string,
): Promise<string> {
  const ethereum = provider.provider;
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (!ethereum.request) throw new Error('No `request` On Ethereum Provider');

  let params = [msg, address.toLowerCase()];
  if (ethereum.isMetaMask) {
    params = [params[1], params[0]];
  }
  const signature = await ethereum.request({
    method: 'personal_sign',
    params,
  });
  return signature;
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
  provider: providers.BaseProvider,
): Promise<WalletType> {
  const code = await new Promise((resolve) => {
    const seconds = 45;
    const id = setTimeout(() => {
      throw new Error(`\`.getCode\` Timed Out After ${seconds}s`);
    }, seconds * 1000);
    provider.getCode(address).then((c) => {
      clearTimeout(id);
      resolve(c);
    });
  });
  return code === '0x' ? WalletType.EOA : WalletType.SMART;
}

export async function verifySignature(
  address: string,
  message: string,
  signature: string,
  provider: providers.BaseProvider,
): Promise<boolean> {
  const walletType = await getWalletType(address, provider);

  if (walletType === WalletType.EOA) {
    const recoveredAddress = utils.verifyMessage(message, signature);
    return address === recoveredAddress;
  }

  // Smart wallet
  const msgBytes = utils.toUtf8Bytes(message);
  const hexMsg = utils.hexlify(msgBytes);
  const hexArray = utils.arrayify(hexMsg);
  const hashMsg = utils.hashMessage(hexArray);

  const contract = new Contract(address, smartWalletABI, provider);
  try {
    return contract.isValidSignature(hashMsg, signature);
  } catch (error) {
    throw new Error(`Unsupported Smart Wallet: ${(error as Error).message}`);
  }
}
