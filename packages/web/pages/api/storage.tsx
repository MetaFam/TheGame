import Busboy, { BusboyHeaders } from 'busboy';
import { CONFIG } from 'config';
import * as fs from 'fs';
import { mkdtemp } from 'fs/promises';
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
  const busboy = new Busboy({ headers: req.headers as BusboyHeaders });
  const files: { field: string; name: string }[] = [];

  busboy.on(
    'file',
    async (fieldname: string, file: Readable, filename: string) => {
      console.log({ fieldname, filename }); // eslint-disable-line no-console

      const ext = filename.replace(/^.*\./, '');
      const field = path.basename(fieldname);
      const name = path.join(
        await mkdtemp(path.join(os.tmpdir(), `${field}-`)),
        `${field}.${ext}`,
      );
      files.push({ field, name });
      file.pipe(fs.createWriteStream(name));
    },
  );

  busboy.on('finish', async () => {
    try {
      if (files.length === 0) {
        throw new Error('No files uploaded.');
      }

      const tmpFiles = files.map(({ name }) => ({
        name: path.basename(name),
        stream: () =>
          (fs.createReadStream(name) as unknown) as ReadableStream<string>,
      }));
      const cid = await storage.put(tmpFiles);
      console.log({ cid, tmpFiles }); // eslint-disable-line no-console

      const uploadedFiles = Object.fromEntries(
        files.map(({ field, name }) => {
          const filename = path.basename(name);
          return [field, `${cid}/${filename}`];
        }),
      );

      res.status(200).json(uploadedFiles);
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
