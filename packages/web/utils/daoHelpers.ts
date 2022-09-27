import { getHexChainId } from './networks';

export const getDAOLink = (chain?: string, address?: string): string | null => {
  if (address && chain) {
    const hexChainId = getHexChainId(chain);
    return `https://app.daohaus.club/dao/${hexChainId}/${address.toLowerCase()}`;
  }
  return null;
};
