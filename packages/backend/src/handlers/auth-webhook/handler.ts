import { did } from '@metafam/utils';
import { Request, Response } from 'express';
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

import { getOrCreatePlayerId } from '#handlers/auth-webhook/users';

const unauthorizedVariables = {
  'X-Hasura-Role': 'public',
};

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

function getHeaderToken(req: Request) {
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
    if (!token) {
      res.json(unauthorizedVariables);
      return;
    }
    const claim = await did.verifyToken({
      token,
      publicClient,
    });
    if (!claim) {
      throw new Error('Invalid token.');
    }

    const { limiter } = req.app.locals;
    const { id, created } = await getOrCreatePlayerId(claim.iss, limiter);

    if (created) {
      console.debug(
        `Created and Authorized playerId: ${id} with address: ${claim.iss}`,
      );
    }

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
