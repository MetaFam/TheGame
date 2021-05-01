import { ethers } from 'ethers';

import { CONFIG } from '../config';
import ERC20_ABI from './abis/ERC20.json';

const { infuraId } = CONFIG;

export const defaultProvider = new ethers.providers.InfuraProvider(1, infuraId);

export const getERC20Contract = (
  contractAddress: string,
  provider: ethers.providers.BaseProvider = defaultProvider,
): ethers.Contract => new ethers.Contract(contractAddress, ERC20_ABI, provider);
