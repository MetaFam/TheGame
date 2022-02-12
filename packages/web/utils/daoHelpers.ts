import { getHexChainId } from '@metafam/utils';

import ethereumImage from '../assets/chains/ethereum.png';
import polygonImage from '../assets/chains/polygon.png';
import xDaiImage from '../assets/chains/xDai.png';

export const getChainImage = (chain: string | undefined) => {
  if (chain?.toLowerCase().includes('xdai')) return xDaiImage;
  if (chain?.toLowerCase().includes('polygon')) return polygonImage;
  return ethereumImage;
};

export const getDaoLink = (chain?: string, address?: string): string | null => {
  if (address && chain) {
    const hexChainId = getHexChainId(chain);
    address = address.toLowerCase(); // eslint-disable-line no-param-reassign
    return `https://app.daohaus.club/dao/${hexChainId}/${address}`;
  }
  return null;
};
