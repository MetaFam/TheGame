import { Request, Response } from 'express';

import { cache3BoxProfiles } from './cache3BoxProfiles';

export const refresh3BoxCacheHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  // const session = req.body.session_variables;
  // const role = session?.['x-hasura-role'] ?? req.headers['x-hasura-role'];
  // if (role !== 'admin') {
  //   throw new Error('expected role admin');
  // }

  const result = await cache3BoxProfiles();

  res.json(result);
};
