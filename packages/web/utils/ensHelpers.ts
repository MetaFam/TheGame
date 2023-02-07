// import { CONFIG } from 'config';
import { ethers } from 'ethers';
// const { mainnetRPC } = CONFIG;

// replace this with the mainnetRPC from above after testing and adding env, uncomment both mainnetRPC and CONFIG
const mainnetProvider = new ethers.providers.JsonRpcProvider(
  'https://ethereum.publicnode.com',
);

export const getAddressFromName = async (ens: string) => {
  const address = await mainnetProvider.resolveName(ens);
   return address?.length === 42 ? address : ens;
};

export const getNameFromAddress = async (address: string) => {
  const name = await mainnetProvider.lookupAddress(address);
  return name ? name : address;
};
