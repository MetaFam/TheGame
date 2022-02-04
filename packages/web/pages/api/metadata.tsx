import { parse } from 'html-metadata-parser';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (req.method === 'GET') {
    try {
      const apiResponse = await parse(url as string, {
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
