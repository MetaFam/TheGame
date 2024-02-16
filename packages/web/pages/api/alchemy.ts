
import { isAddress } from "@ethersproject/address";
import { Alchemy, Network } from "alchemy-sdk";
import { NextApiRequest, NextApiResponse } from 'next';

import { AlchemyMultichainClient } from "./alchemy-multichain-client";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET,
  network: Network.ETH_MAINNET,
};

const overrides = {
  [Network.MATIC_MAINNET]: {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MATIC,
  },
  [Network.OPT_MAINNET]: {  
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM,
  },
}

const alchemy = new AlchemyMultichainClient(config, overrides);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner } = req.query;
  if (!owner) return res.status(400).json({ error: `Missing Owner Address` });
  if (req.method === 'GET' && isAddress(owner as string)) {
    try {
      const mainnetNfts = await alchemy
      .forNetwork(Network.ETH_MAINNET)
      .nft.getNftsForOwner(owner as string, { pageSize: 5 })
    
      const maticNfts = await alchemy
      .forNetwork(Network.MATIC_MAINNET)
      .nft.getNftsForOwner(owner as string, { pageSize: 5 });
  
      const optimismNfts = await alchemy
      .forNetwork(Network.OPT_MAINNET)
      .nft.getNftsForOwner(owner as string, { pageSize: 5 });

      return res.json({ mainnetNfts, maticNfts, optimismNfts });
    } catch (err) {
      const status = 500;
      const msg = (err as Error).message;
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