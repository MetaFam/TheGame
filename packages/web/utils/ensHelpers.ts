import { CONFIG } from 'config';
import { ethers } from 'ethers';
import { getPlayer } from 'graphql/getPlayer';

const { mainnetRPC } = CONFIG;

const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetRPC);

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
  // console.log('getENSForAddress', address);
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

  if (username.includes('.')) {
    await getAddressForENS(username).then((address) => {
      user.address = address?.toLowerCase() || username;
    });
    user.ens = username;
  }

  const player = await getPlayer(user.address).then((data) => data);

  const profileInfo = {
    playerProfile: player,
    ens: user.ens,
  };

  return profileInfo;
};
