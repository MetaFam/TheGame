import { getSession } from 'lib/ironSession';
import {
  NextApiRequest as NextAPIRequest,
  NextApiResponse as NextAPIResponse,
} from 'next';
import { generateNonce } from 'siwe';

const handler = async (
  req: NextAPIRequest,
  res: NextAPIResponse,
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const session = await getSession(req, res);
      session.nonce = generateNonce();
      await session.save();
      res.setHeader('Content-Type', 'text/plain');
      res.send(session.nonce);
      break;
    }
    default: {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default handler;
