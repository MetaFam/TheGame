/* eslint-disable no-empty */
import CID from 'cids';

import { IPFS_LINK_PATTERN } from './constants.js';
import { Maybe } from './extendedProfileTypes.js';

export const httpLink = (uri?: Maybe<string>) => {
  const [, origCID, path] =
    uri?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? [];

  try {
    if (origCID) {
      const cid = new CID(origCID);

      let v0CID = '';
      try {
        v0CID = cid.toV0().toString();
      } catch {}

      let v1CID = '';
      try {
        v1CID = cid.toV1().toString('base32');
      } catch {}

      const pattern = IPFS_LINK_PATTERN;
      return pattern
        .replace(/{cid}/g, origCID)
        .replace(/{v0cid}/g, v0CID)
        .replace(/{v1cid}/g, v1CID)
        .replace(/{path}/g, path ?? '');
    }
  } catch {}

  return uri ?? undefined; // Image.src won't take null
};

export const isSGML = (str: string) =>
  /<([a-z]+).*(\/>|[^/]>.*<\/\1>)/is.test(str);
