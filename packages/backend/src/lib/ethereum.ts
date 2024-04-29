import { ethers } from 'ethers';

import { CONFIG } from '../config.js';
import ERC20_ABI from './abis/ERC20.json' assert { type: 'json' };

const { infuraId } = CONFIG;

export const mainnetProvider = new ethers.InfuraProvider(1, infuraId);
export const polygonProvider = new ethers.InfuraProvider(137, infuraId);

export const getERC20Contract = (
  contractAddress: string,
  provider: ethers.Provider = mainnetProvider,
): ethers.Contract => new ethers.Contract(contractAddress, ERC20_ABI, provider);
