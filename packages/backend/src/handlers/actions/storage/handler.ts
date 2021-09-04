import { Request, Response } from 'express';
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { CONFIG } from '../../../config'

// eslint-disable-next-line import/no-default-export
export default async (req: Request | any, res: Response): Promise<void> => {
  const storage = new Web3Storage({ token: CONFIG.web3StorageToken })
  console.info('¡WEB3 STORAGE!:', CONFIG.web3StorageToken, process.env.WEB3_STORAGE_TOKEN)

  const files = (await getFilesFromPath(req.file.path)) as any

  const onRootCidReady = (cid: string) => {
    console.log('uploading files with cid:', cid)
  }
  const cid = await storage.put(files, { onRootCidReady })

  console.info('FILE', Object.keys(req.file))
  console.info('CID', `${cid}/${req.file.filename}`)

  // const expiration = new Date();
  // expiration.setDate(expiration.getDate() - INVALIDATE_AFTER_DAYS);
  // const { profile_cache: players } = await client.GetCacheEntries({
  //   updatedBefore: expiration,
  // });
  // const idsToProcess: string[] = [];
  // await Promise.all(
  //   players.map(async ({ playerId }) => {
  //     if (!req.app.locals.queuedRecacheFor[playerId]) {
  //       req.app.locals.queuedRecacheFor[playerId] = true;
  //       idsToProcess.push(playerId);
  //       req.app.locals.limiter.schedule(() =>
  //         (async () => {
  //           try {
  //             await updateCachedProfile(playerId);
  //           } finally {
  //             req.app.locals.queuedRecacheFor[playerId] = false;
  //           }
  //         })(),
  //       );
  //     }
  //   }),
  // );
  res.json({ image: `${cid}/${req.file.filename}` });
};
