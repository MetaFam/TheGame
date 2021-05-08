import { Contract, providers, utils } from 'ethers';

export async function signerHelper(
  provider: providers.Web3Provider,
  rawMessage: string,
): Promise<string> {
  const ethereum = provider.provider;
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (!ethereum.request) throw new Error('invalid ethereum provider');

  let params = [rawMessage, address.toLowerCase()];
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
  const code = await provider.getCode(address);
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
  const arrayishMessage = utils.toUtf8Bytes(message);
  const hexMessage = utils.hexlify(arrayishMessage);
  const hexArray = utils.arrayify(hexMessage);
  const hashMessage = utils.hashMessage(hexArray);

  const contract = new Contract(address, smartWalletABI, provider);
  try {
    const returnValue = await contract.isValidSignature(hashMessage, signature);
    return returnValue;
  } catch (error) {
    throw new Error('unsupported smart wallet');
  }
}
