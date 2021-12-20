import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiResponse = await parse('https://metagame.substack.com/feed', {
      timeout: 2000,
    });

    return res.json({ error: null, response: apiResponse });
  } catch (err) {
    return res.json({ error: err, response: null });
  }
}

export default handler;
