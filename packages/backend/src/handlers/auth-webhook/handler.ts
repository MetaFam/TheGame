import { did } from '@metafam/utils';
import { Request, Response } from 'express';

import { getPlayer } from './users';

const unauthorizedVariables = {
  'X-Hasura-Role': 'public',
};

function getHeaderToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  if (token.length === 0) return null;
  return token;
}

export const authHandler = async (req: Request, res: Response) => {
  const token = getHeaderToken(req);

  if (!token) {
    res.json(unauthorizedVariables);
  } else {
    const claim = did.verifyToken(token);
    if (!claim) {
      res.status(401).send();
      return;
    }

    const player = await getPlayer(claim.iss);

    const hasuraVariables = {
      'X-Hasura-Role': 'player',
      'X-Hasura-User-Id': player.id,
    };

    res.json(hasuraVariables);
  }
};
