import { Request, Response } from 'express';
import { leveldb } from '../../../lib/leveldb';

export async function UpdateMap(req: Request, res: Response) {
  try {
    await leveldb.put(`${req.query.name}`, JSON.stringify(req.body.data));
    return res.status(200).send({ status: 'OK' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'ERROR', message: error });
  }  
}

export async function GetMap(req: Request, res: Response) {
  try {
    const data = await leveldb.get(`${req.query.name}`);
    return res.status(200).send({ status: 'OK', data: JSON.parse(data.toString()) });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'ERROR', message: error });
  }  
}