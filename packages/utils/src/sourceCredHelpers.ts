import { ethers } from 'ethers';
import { SCIdentity, sourcecred as sc } from 'sourcecred';

export const getLatestEthAddress = (identity: SCIdentity): string | null => {
  const ethAddresses = identity.aliases.filter((alias) => {
    const parts = sc.core.graph.NodeAddress.toParts(alias.address);
    return (
      parts.indexOf('ethereum') > 0 && ethers.utils.isAddress(alias.description)
    );
  });
  if (ethAddresses.length > 0) {
    // this assumes that the fetched data is in chronological order, which should
    // be the case for the SC Ledger
    const latestAddress = ethAddresses.pop();
    if (latestAddress != null) {
      return latestAddress?.description.toLowerCase();
    }
  }

  return null;
};
