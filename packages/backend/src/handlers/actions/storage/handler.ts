import { Request, Response } from 'express';
import { Web3Storage } from 'web3.storage';
import { CONFIG } from '../../../config'
import Busboy from 'busboy'

const multipart = (request: Request) => {
  const storage = new Web3Storage({ token: CONFIG.web3StorageToken })

  return new Promise(async (resolve, reject) => {
    const headers = request.headers;
    console.info('BODY', request.body)
    const busboy = new Busboy({ headers });
    console.info('BBOY', busboy)
    // you may need to add cleanup logic using 'busboy.on' events
    busboy.on('error', (err: Error) => reject(err));
    busboy.on('image', (_fieldName: unknown, fileStream: unknown, filename: string) => {
      console.info('¡FILE!')
      const params = [{
        name: filename,
        stream: () => fileStream,
      }];
      storage.put(params as any)
      .then((cid) => {
        console.info(cid)
        resolve(cid)
      })
    })
    request.pipe(busboy)
  });
}

// eslint-disable-next-line import/no-default-export
export default async (req: Request, _res: Response): Promise<void> => {
  console.info('¡WEB3 STORAGE!')

  const cid = await multipart(req)

  console.info('CID', cid)

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
  // res.json({ ids: idsToProcess });
};
