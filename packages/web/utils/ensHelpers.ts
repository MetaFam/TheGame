import { ethers } from 'ethers';

const mainnetProvider = new ethers.providers.JsonRpcProvider(
  'https://eth.llamarpc.com',
);

export const getAddressFromName = async (ens: string) => {
  const address = await mainnetProvider.resolveName(ens);
  const data = address?.length === 42 ? address : ens; 
  return data;
};

export const getNameFromAddress = async (address: string) => {
  const name = await mainnetProvider.lookupAddress(address);
  const data  = name ? name : address;
  return data;
}
