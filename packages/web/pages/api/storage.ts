import Busboy from 'busboy';
import { CONFIG } from 'config';
import * as fs from 'fs';
import { mkdtemp, rmdir, unlink } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as os from 'os';
import * as path from 'path';
import { Readable } from 'stream';
import { Web3Storage } from 'web3.storage';

export const handler: (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>,
) => Promise<void> = async (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>,
) => {
  const storage = new Web3Storage({ token: CONFIG.web3StorageToken });
  const busboy = Busboy({ headers: req.headers });
  const files: { field: string; name: string }[] = [];

  busboy.on('file', async (fieldname: string, file: Readable, { filename }) => {
    const field = path.basename(fieldname);
    const name = path.join(
      await mkdtemp(path.join(os.tmpdir(), `${field}-`)),
      filename,
    );
    files.push({ field, name });
    file.pipe(fs.createWriteStream(name));
  });

  busboy.on('finish', async () => {
    try {
      if (files.length === 0) {
        throw new Error('No files uploaded.');
      }

      const tmpFiles = files.map(({ field, name }) => ({
        name: `${field}/${path.basename(name)}`,
        stream: () =>
          fs.createReadStream(name) as unknown as ReadableStream<string>,
      }));
      const cid = await storage.put(tmpFiles);

      await Promise.all(
        files.map(async ({ name }) => {
          await unlink(name);
          await rmdir(path.dirname(name));
        }),
      );

      const uploadedFiles = Object.fromEntries(
        files.map(({ field, name }) => {
          const filename = path.basename(name);
          return [field, `${cid}/${field}/${filename}`];
        }),
      );

      res.status(201).json(uploadedFiles);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      res.status(500).json({ error: (err as Error).message });
    }
  });
  req.pipe(busboy);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
