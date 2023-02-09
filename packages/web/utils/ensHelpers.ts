// import { CONFIG } from 'config';
import { ethers } from 'ethers';
import { getPlayer } from 'graphql/getPlayer';

// replace this with the mainnetRPC from above after testing and adding env, uncomment both mainnetRPC and CONFIG
const mainnetProvider = new ethers.providers.JsonRpcProvider(
  'https://ethereum.publicnode.com',
);

export const getAddressForENS = async (ens: string) => {
  if (!ens) return null;
  try {
    const address = await mainnetProvider.resolveName(ens);
    return address;
  } catch (error) {
    return null;
  }
};

export const getENSForAddress = async (address: string | undefined) => {
  if (!address) return null;
  try {
    const name = await mainnetProvider.lookupAddress(address);
    return name;
  } catch {
    return null;
  }
};

export const getPlayerData = async (username: string) => {
  const user = {
    address: '',
    ens: '',
  };

  if (username == null) {
    return { playerProfile: '', ens: '' };
  }

  // If username in url includes a . attempt to resolve ENS
  if (username.includes('.')) {
    const address = await getAddressForENS(username);
    user.address = address?.toLowerCase() || username;
    user.ens = username;
  }

  const player = await getPlayer(user.address).then((data) => data);

  const profileInfo = {
    playerProfile: player,
    ens: user.ens,
  };

  return profileInfo;
};

