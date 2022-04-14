import { NextApiRequest, NextApiResponse } from 'next';

const baseMWWUrl = 'https://meet-with-wallet-git-develop-appcalipse.vercel.app';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await (
        await fetch(
          `${baseMWWUrl}/api/accounts/calendar_url/${req.query.address}`,
        )
      ).json();

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(404).send(404);
    }
  } else if (req.method === 'PUT') {
    try {
      const sigMessageResult = await (
        await fetch(`${baseMWWUrl}/api/auth/signature/${req.query.address}`)
      ).json();

      return res.json(sigMessageResult);
    } catch (err) {
      return res.json({ error: err, response: null });
    }
  } else if (req.method === 'POST') {
    try {
      const account = await (
        await fetch(`${baseMWWUrl}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: req.body,
        })
      ).json();

      return res.json(account);
    } catch (err) {
      return res.json({ error: err, response: null });
    }
  } else {
    return res.json({ error: 'Error: Incorrect Method', response: null });
  }
}

export default handler;
