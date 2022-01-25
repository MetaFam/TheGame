import CID from 'cids';

import { IPFS_LINK_PATTERN } from './constants';
import { Maybe } from './extendedProfileTypes';

export const httpLink = (uri?: Maybe<string>) => {
  const [, origCID, path] =
    uri?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? [];

  if (origCID) {
    const cid = new CID(origCID);
    const v0CID = cid.toV0().toString();
    const v1CID = cid.toV1().toString('base32');
    const pattern = IPFS_LINK_PATTERN;
    return pattern
      .replace(/{cid}/g, origCID)
      .replace(/{v0cid}/g, v0CID)
      .replace(/{v1cid}/g, v1CID)
      .replace(/{path}/g, path ?? '');
  }

  return uri ?? undefined; // Image.src won't take null
};
