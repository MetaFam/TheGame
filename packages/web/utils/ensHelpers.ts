import { CONFIG } from 'config';
import { ethers } from 'ethers';
import { getPlayer } from 'graphql/getPlayer';

const { mainnetRPC } = CONFIG;

const mainnetProvider = new ethers.providers.StaticJsonRpcProvider(mainnetRPC);

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

<<<<<<< HEAD
export const getENSAndPlayer = async (username: string) => {
  if (username == null) {
    return null;
  }

  let userAddress: string | undefined;
=======
export const getPlayerAndENSName = async (username: string) => {
  if (username == null) {
    return { player: null, ens: null };
  }
  const user = {
    address: '',
    ens: '',
  };
>>>>>>> 7b477b48 (Fixed player loading)

  if (username.includes('.')) {
    const address = await getAddressForENS(username);
    userAddress = address?.toLowerCase();
  }
<<<<<<< HEAD
  if (userAddress != null) {
    const player = await getPlayer(userAddress);
    return {
      player,
      ens: username,
    };
  }
  return null;
=======

  const player = await getPlayer(user.address);

  const profileInfo = {
    player,
    ens: user.ens,
  };

  return profileInfo;
>>>>>>> 7b477b48 (Fixed player loading)
};
