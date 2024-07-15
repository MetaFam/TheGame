import ERC20_ABI from './abis/ERC20.json' assert { type: 'json' };
import { getContract, PublicClient } from 'viem';

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
