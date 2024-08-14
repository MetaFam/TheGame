import { getContract, PublicClient } from 'viem';

import ERC20_ABI from './abis/ERC20.json' assert { type: 'json' };

export const getERC20Contract = (
  contractAddress: `0x${string}`,
  client: PublicClient
) => (
  getContract({
    address: contractAddress,
    abi: ERC20_ABI,
    client,
  })
)
