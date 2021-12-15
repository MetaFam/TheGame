import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { parse } from 'rss-to-json';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  try {
    const apiResponse = await parse('https://metagame.substack.com/feed', {
      timeout: 1000,
    });

    return res.json({ response: apiResponse });
  } catch (err) {
    return res.json({ error: err });
  }
}

export default handler;
