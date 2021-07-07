import { Request, Response } from 'express';

import { cache3BoxProfiles } from './cache3BoxProfiles';

export const refresh3BoxCacheHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const result = await cache3BoxProfiles();

  res.json(result);
};
