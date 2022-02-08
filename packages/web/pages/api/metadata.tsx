import { parse } from 'html-metadata-parser';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (req.method === 'GET') {
    try {
      const response = await parse(url as string, {
        timeout: 2000,
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
