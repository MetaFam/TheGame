import { isAddress } from '@ethersproject/address';
import { CONFIG } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenSeaAPI } from 'opensea-js';
import { OpenSeaAssetQuery } from 'opensea-js/lib/types';
import { isEmpty } from 'utils/objectHelpers';
import { Collectible, parseOpenSeaAssets } from 'utils/openseaHelpers';

const opensea = new OpenSeaAPI({ apiKey: CONFIG.openseaAPIKey });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner, offset = 0, limit = 50 } = req.query;
  if (req.method === 'GET' && isAddress(owner as string)) {
    try {
      const assets = await fetchOpenSeaData({
        owner: owner as string,
        offset: Number(offset),
        limit: Number(limit),
      });

      return res.json({ assets });
    } catch (err) {
      let status = 500;
      let msg = (err as Error).message;
      if (/403.*unauthorized/i.test(msg)) {
        status = 403;
        msg = 'Unauthorized';
        if (CONFIG.openseaAPIKey == null || isEmpty(CONFIG.openseaAPIKey)) {
          msg += ': Missing OPENSEA_API_KEY Environment Variable';
        }
      }
      return res.status(status).json({ error: msg });
    }
  } else if (!isAddress(owner as string)) {
    return res.status(400).json({ error: `Invalid Owner Address` });
  } else {
    return res
      .status(405)
      .json({ error: `Incorrect Method: ${req.method} (GET Supported)` });
  }
}

export default handler;

const fetchOpenSeaData = async (
  query: OpenSeaAssetQuery,
): Promise<Array<Collectible>> => {
  const { assets } = await opensea.getAssets(query);
  return parseOpenSeaAssets(assets);
};
