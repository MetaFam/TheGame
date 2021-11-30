import CID from 'cids';
import { CONFIG } from 'config';

export const httpLink = (uri: string | undefined | null) => {
  const [, cid, path] =
    uri?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? [];

  if (cid) {
    const v1CID = new CID(cid).toV1().toString('base32');
    const pattern = CONFIG.ipfsLinkPattern;
    return pattern.replace(/{cid}/g, v1CID).replace(/{path}/g, path ?? '');
  }

  return uri;
};
