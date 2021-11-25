import { Request, Response } from 'express';
import fs from 'fs';
import Path from 'path';
import { Web3Storage } from 'web3.storage';

import { CONFIG } from '../../../config';

export default async (req: Request, res: Response): Promise<Response> => {
  const storage = new Web3Storage({ token: CONFIG.web3StorageToken });
  const input = req.files as Record<string, Array<Express.Multer.File>>;

  const files = Object.entries(input).map(([key, [{ path }]]) => ({
    name: key,
    stream: () =>
      fs.createReadStream(
        Path.isAbsolute(path) ? path : Path.join(process.cwd(), path),
      ) as any,
  }));

  const cid = await storage.put(files);

  const uploadedFiles = Object.fromEntries(
    Object.keys(input).map((key: string) => [key, `${cid}/${key}`]),
  );
  return res.json(uploadedFiles);
};
