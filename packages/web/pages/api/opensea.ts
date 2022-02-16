import { CONFIG } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenSeaAPI } from 'opensea-js';
import { OpenSeaAssetQuery } from 'opensea-js/lib/types';
import { Collectible, parseOpenSeaAssets } from 'utils/openseaHelpers';

const opensea = new OpenSeaAPI({ apiKey: CONFIG.openseaApiKey });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner, offset = 0, limit = 50 } = req.query;
  if (req.method === 'GET' && owner) {
    try {
      const response = await fetchOpenSeaData({
        owner: owner as string,
        offset: Number(offset),
        limit: Number(limit),
      });

      return res.json({ response });
    } catch (err) {
      return res.json({ error: (err as Error).message });
    }
  } else {
    return res.json({ error: `Incorrect Method: ${req.method}` });
  }
}

export default handler;

const fetchOpenSeaData = async (
  query: OpenSeaAssetQuery,
): Promise<Array<Collectible>> => {
  try {
    const response = await opensea.getAssets(query);
    return parseOpenSeaAssets(response.assets);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error Retrieving OpenSea Assets: ${(err as Error).message}`);
    return Promise.resolve([]);
  }
};
