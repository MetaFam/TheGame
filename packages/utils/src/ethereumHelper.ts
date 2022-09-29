import { Contract, providers, utils } from 'ethers';

const WELCOME_MESSAGE = `Welcome to MetaGame Anon 🐙 \n Please sign this message so we know it is you.\n We care about privacy and assure you, we don't harvest your data. Unless you create a Player account, we simply store a token in your browser's local storage. This can be removed by using the disconnect button.\n `;

export async function getSignature(
  provider: providers.Web3Provider,
  msg: string,
  extraParams?: string[] | undefined,
): Promise<string> {
  const ethereum = provider.provider;
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (!ethereum.request) throw new Error('No `request` On Ethereum Provider');
  const signMsg = `${WELCOME_MESSAGE}${msg}`;
  let params = [signMsg, address];

  if (extraParams) {
    params = [...params, ...extraParams];
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
        // eslint-disable-next-line no-console
        console.error('`.getCode` Error', err);
        reject(err);
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

  // eslint-disable-next-line no-param-reassign
  message = `${WELCOME_MESSAGE}${message}`;

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
