import { Request, Response } from 'express';

export const handleOAuthCallback = async (
  _: Request,
  res: Response,
): Promise<void> => {
  console.log('Discord OAuth Callback URL called!');
  console.log(_);

  res.json({
    status: 'Success!'
  });
};
