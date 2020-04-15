import { Request, Response } from 'express';
import { verifyToken } from './did';
import { getPlayer } from './users';

const unauthorizedVariables = {
  'X-Hasura-Role': 'public',
};

function getHeaderToken(req: Request): string | null {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  if(token.length === 0) return null;
  return token;
}

const handler = async (req: Request, res: Response) => {

  const token = getHeaderToken(req);

  if(!token) {
    res.json(unauthorizedVariables);
    return;
  }
  else {

    const claim = verifyToken(token);
    if(!claim) {
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

export default handler;
