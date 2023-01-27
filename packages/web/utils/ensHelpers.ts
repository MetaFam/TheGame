import { ethers } from 'ethers';

export const getAddressFromName = async (ens: string) => {
  // getting a provider without user connecting, todo: use whatever rpc metagame wants
  const mainnetProvider = new ethers.providers.JsonRpcProvider(
    'https://eth.llamarpc.com',
  );
  const address = await mainnetProvider.resolveName(ens);
  const data = address?.length === 42 ? address : ens; 
  return data;
};
