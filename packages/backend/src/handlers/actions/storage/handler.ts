import { Request, Response } from 'express';
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { CONFIG } from '../../../config'

// eslint-disable-next-line import/no-default-export
export default async (req: Request | any, res: Response): Promise<Record<string, any>> => {
  const storage = new Web3Storage({ token: CONFIG.web3StorageToken })

  const filePaths = Object.values(req.files as any[]).map(([{ path }]) => path)
  const files = await getFilesFromPath(filePaths)

  const cid = await storage.put(files as any)

  const uploadedFiles = Object.fromEntries(
    Object.entries(req.files as any).map(
      ([key, [{ filename }]]: any[]) => [key, `${cid}/${filename}`]
    )
  )
  return res.json(uploadedFiles);
};
