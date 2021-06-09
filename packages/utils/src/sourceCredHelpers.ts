import { ethers } from 'ethers';
import { SCIdentity, sourcecred as sc } from 'sourcecred';

export const getLatestEthAddress = (identity: SCIdentity): string | null => {
  const ethAddress = identity.aliases.find((alias) => {
    const parts = sc.core.graph.NodeAddress.toParts(alias.address);
    return parts.indexOf('ethereum') > 0;
  })?.description;

  if (ethAddress && ethers.utils.isAddress(ethAddress)) {
    return ethAddress.toLowerCase();
  }

  return null;
};
