import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const apiResponse = await parse('https://metagame.substack.com/feed', {
        timeout: 2000,
      });

      return res.json({ error: null, response: apiResponse });
    } catch (err) {
      return res.json({ error: err, response: null });
    }
  } else {
    return res.json({ error: 'Error: Incorrect Method', response: null });
  }
}

export default handler;
