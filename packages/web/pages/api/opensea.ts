import { CONFIG } from 'config';
import { utils } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenSeaAPI } from 'opensea-js';
import { OpenSeaAssetQuery } from 'opensea-js/lib/types';
import { Collectible, parseOpenSeaAssets } from 'utils/openseaHelpers';

const opensea = new OpenSeaAPI({ apiKey: CONFIG.openseaApiKey });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner, offset = 0, limit = 50 } = req.query;
  if (req.method === 'GET' && utils.isAddress(owner as string)) {
    try {
      const assets = await fetchOpenSeaData({
        owner: owner as string,
        offset: Number(offset),
        limit: Number(limit),
      });

      return res.json({ assets });
    } catch (err) {
      return res.json({ error: (err as Error).message });
    }
  } else if (!utils.isAddress(owner as string)) {
    return res.json({ error: `Invalid Owner Address` });
  } else {
    return res.json({ error: `Incorrect Method: ${req.method}` });
  }
}

export default handler;

const fetchOpenSeaData = async (
  query: OpenSeaAssetQuery,
): Promise<Array<Collectible>> => {
  const { assets } = await opensea.getAssets(query);
  return parseOpenSeaAssets(assets);
};
