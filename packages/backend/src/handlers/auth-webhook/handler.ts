import { did } from '@metafam/utils';
import { Request, Response } from 'express';

import { defaultProvider } from '../../lib/ethereum';
import { getOrCreatePlayerId } from './users';

const unauthorizedVariables = {
  'X-Hasura-Role': 'public',
};

function getHeaderToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  if (authHeader.substring(0, 6) !== 'Bearer')
    throw new Error('invalid token type');

  const token = authHeader.replace('Bearer', '').trim();
  if (token.length === 0) return null;
  return token;
}

export const authHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let token;
  try {
    token = getHeaderToken(req);
  } catch (_) {
    res.status(401).send();
    return;
  }

  if (!token) {
    res.json(unauthorizedVariables);
  } else {
    const claim = await did.verifyToken(token, defaultProvider);
    if (!claim) {
      res.status(401).send();
      return;
    }

    const id = await getOrCreatePlayerId(claim.iss);

    const hasuraVariables = {
      'X-Hasura-Role': 'player',
      'X-Hasura-User-Id': id,
    };

    res.json(hasuraVariables);
  }
};
