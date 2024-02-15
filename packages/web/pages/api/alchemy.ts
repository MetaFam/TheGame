
import { Alchemy, Network } from "alchemy-sdk";
import { isAddress } from "@ethersproject/address";
import { NextApiRequest, NextApiResponse } from 'next';

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner } = req.query;
  if (req.method === 'GET' && isAddress(owner as string)) {
    try {
      const nfts = await alchemy.nft.getNftsForOwner("serox.eth");

      return res.json({ nfts });
    } catch (err) {
      let status = 500;
      let msg = (err as Error).message;
      return res.status(status).json({ error: msg });
    }
  } else if (!isAddress(owner as string)) {
    return res.status(400).json({ error: `Invalid Owner Address` });
  } else {
    return res
      .status(405)
      .json({ error: `Incorrect Method: ${req.method} (GET Supported)` });
  }
}

export default handler;