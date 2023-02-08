// import { CONFIG } from 'config';
import { ethers } from 'ethers';
// const { mainnetRPC } = CONFIG;

// replace this with the mainnetRPC from above after testing and adding env, uncomment both mainnetRPC and CONFIG
const mainnetProvider = new ethers.providers.JsonRpcProvider(
  'https://ethereum.publicnode.com',
);

export const getAddressForENS = async (ens: string) => {
  if (ens) return null;
  const address = await mainnetProvider.resolveName(ens);
  return address;
};

export const getENSForAddress = async (address: string | undefined) => {
  if (!address) return null;
  const name = await mainnetProvider.lookupAddress(address);
  return name;
};
