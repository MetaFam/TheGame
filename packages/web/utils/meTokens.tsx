import { CONFIG } from 'config';
import MeTokensRegistryABI from 'contracts/meTokensRegistry.abi';
import { Contract, ethers } from 'ethers';

export const metokenRegistry = '0x8b91FcF2230ab04A46e2D83aaF062EC1B5AAAa5c';
export const metokenFactory = '0x8D4ee3599aF814bF3Aa884c161f0dE81d9e97225';
export const hubFacet = '0x4555cf6E984186F6C0dfeba1A26764b21553B39f';
export const foundryFacet = '0xA56AAF637b057a5EDf7b7252D0B7280042E71335';

const { mainnetRPC } = CONFIG;

const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetRPC);

export const getMeToken = async (address: string) => {
  const registry = await new Contract(
    metokenRegistry,
    MeTokensRegistryABI,
    mainnetProvider.getSigner('0xc0163E58648b247c143023CFB26C2BAA42C9d9A9'),
  );
  await registry.getOwnerMeToken(address);

  return -1;
};

export const getMeTokenInfo = async (address: string) => {
  const signer = await mainnetProvider.getSigner(
    '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
  );

  const registry = await new Contract(
    metokenRegistry,
    MeTokensRegistryABI,
    signer,
  );
  await registry.getMeTokenInfo(address);

  return -1;
};
