import { getSession } from 'lib/ironSession';
import {
  NextApiRequest as NextAPIRequest,
  NextApiResponse as NextAPIResponse,
} from 'next';

const handler = async (
  req: NextAPIRequest,
  res: NextAPIResponse,
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const session = await getSession(req, res);
      res.send({ address: session.siwe?.data.address });
      break;
    }
    default: {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default handler;
