import { did, Maybe } from '@metafam/utils';
import { ethers } from 'ethers';
import { Request, Response } from 'express';

import { mainnetProvider } from '../../lib/ethereum.js';
import { getOrCreatePlayerId } from './users.js';

const unauthorizedVariables = {
  'X-Hasura-Role': 'public',
};

function getHeaderToken(req: Request): Maybe<string> {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  if (!authHeader.startsWith('Bearer')) {
    throw new Error(`Invalid Token Type: ${authHeader.split(/\s/)[0]}`);
  }

  const token = authHeader.replace(/^Bearer/, '').trim();
  if (token.length === 0) return null;
  return token;
}

export const authHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = getHeaderToken(req);
    console.info(`Token for request: ${token}.`);
    if (!token) {
      res.json(unauthorizedVariables);
      return;
    }
    const claim = await did.verifyToken(
      token,
      mainnetProvider as unknown as ethers.providers.Web3Provider,
    );
    if (!claim) {
      throw new Error('Invalid token');
    }

    const { limiter } = req.app.locals;
    const { id, created } = await getOrCreatePlayerId(claim.iss, limiter);

    console.info(
      `${
        created ? 'Created and ' : ''
      }Authorized playerId: ${id} with address: ${claim.iss}`,
    );

    const hasuraVariables = {
      'X-Hasura-Role': 'player',
      'X-Hasura-User-Id': id,
    };

    // hasura auth web hook must only respond with 200 or 401
    res.status(200).json(hasuraVariables);
  } catch (error) {
    console.error('Error authorizing request: ', error);
    res.status(401).send();
  }
};
