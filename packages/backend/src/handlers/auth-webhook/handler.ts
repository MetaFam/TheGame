import { Request, Response } from 'express';

const unauthorizedVariables = {
  'X-Hasura-Role': 'public',
};

const handler = async (req: Request, res: Response) => {

  // const userId = 'dc6b03eb-91fb-41d2-b739-ec74a5ef76fe';
  // const role = 'player';
  // const hasuraVariables = {
  //   'X-Hasura-Role': role,
  //   'X-Hasura-User-Id': userId,
  // };

  res.json(unauthorizedVariables);

};

export default handler;
