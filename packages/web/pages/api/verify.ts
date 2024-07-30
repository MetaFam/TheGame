import {
  NextApiRequest as NextAPIRequest,
  NextApiResponse as NextAPIResponse,
} from 'next';
import { SiweMessage } from 'siwe';

import { getSession } from '#lib/ironSession';

const handler = async (
  req: NextAPIRequest,
  res: NextAPIResponse,
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'POST': {
      try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.verify({ signature });

        const session = await getSession(req, res);
        if (fields.data.nonce !== session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' });

        session.siwe = fields;
        await session.save();
        res.json({ ok: true });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  return undefined;
};

export default handler;
