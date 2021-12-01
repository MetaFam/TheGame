// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Busboy from "busboy";
import { Web3Storage } from "web3.storage";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { File, Blob } from "@web-std/file";
import { CONFIG } from 'config'


declare global {
  interface ObjectConstructor {
    fromEntries(xs: [string|number|symbol, any][]): object
  }
}


async function handler(req: NextApiRequest, res: NextApiResponse<Record<string, string>>) {

  const storage = new Web3Storage({ token: CONFIG.web3StorageToken });
  
  const busboy = new Busboy({ headers: req.headers });
  const files: string[] = []  
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

    console.log ("LOOK-here")

    const name = path.join(os.tmpdir(), path.basename(fieldname))
    files.push(name)
    file.pipe(fs.createWriteStream(name))  
  })

  busboy.on('finish', async () =>{
    const tmpFiles = files.map((filename) => ({
      name: path.basename(filename),
      stream: () => (
        (fs.createReadStream(filename) as unknown) as ReadableStream<string> 
      ),
    })); 
    const cid = await storage.put(tmpFiles);
      console.log ({cid, tmpFiles})

    const uploadedFiles = Object.fromEntries(
      files.map((filename: string) => {
        const name = path.basename(filename) 
        return [name, `${cid}/${name}`]
      })
    ) as Record<string, string>

    res.status(200).json(uploadedFiles);
  })
  req.pipe(busboy)

}

export default handler;
