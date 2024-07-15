import {
  NextApiRequest as NextAPIRequest,
  NextApiResponse as NextAPIResponse,
} from 'next';

import { getSession } from '#lib/ironSession';

const handler = async (
  req: NextAPIRequest,
  res: NextAPIResponse,
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const session = await getSession(req, res);
      session.destroy();
      res.send({ ok: true });
      break;
    }
    default: {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  return undefined;
};

export default handler;
