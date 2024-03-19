import { getIronSession } from 'iron-session';
import {
  NextApiRequest as NextAPIRequest,
  NextApiResponse as NextAPIResponse,
} from 'next';

export const ironSessionConfig = {
  password:
    process.env.SESSION_SECRET ??
    (() => {
      throw new Error('No `$SESSION_SECRET`.');
    })(),
  cookieName: 'metagame’s-mymeta-iron-session',
  cookieOptions: {
    sameSite: 'none',
    partitioned: true,
    // httpOnly: false,
    // secure: Boolean(Deno.env.get('SECURE_SESSION') ?? false),
  } as const,
};

export type IronSession = {
  destroy: () => void;
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
  save: () => void;
  nonce: string;
  siwe: {
    data: {
      address: string;
    };
  };
};

export const getSession = (req: NextAPIRequest, res: NextAPIResponse) =>
  getIronSession<IronSession>(req, res, ironSessionConfig);
