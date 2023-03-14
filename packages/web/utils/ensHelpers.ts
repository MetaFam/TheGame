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
  try {
    const name = await mainnetProvider.lookupAddress(address);
    return name;
  } catch {
    return null;
  }
};

export const getPlayerAndENSName = async (username: string) => {
  if (username == null) {
    return { player: null, ens: null };
  }
  const user = {
    address: '',
    ens: '',
  };

  if (username.includes('.')) {
    await getAddressForENS(username).then((address) => {
      user.address = address?.toLowerCase() || username;
    });
    user.ens = username;
  }

  const player = await getPlayer(user.address);

  const profileInfo = {
    player,
    ens: user.ens,
  };

  return profileInfo;
};
