import { CONFIG } from 'config';

export type NetworkInfo = {
  [chainId: string]: {
    chainId: string;
    name: string;
    label: string;
    symbol: string;
    explorer: string;
    rpc: string;
  };
};

export const NETWORK_INFO: NetworkInfo = {
  '0x1': {
    chainId: '0x1',
    name: 'Ethereum Mainnet',
    label: 'Ethereum',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: `https://mainnet.infura.io/v3/${CONFIG.infuraId}`,
  },
  '0x64': {
    chainId: '0x64',
    name: 'Gnosis Chain',
    label: 'Gnosis',
    symbol: 'xDAI',
    explorer: 'https://blockscout.com/xdai/mainnet',
    rpc: 'https://rpc.gnosischain.com/',
  },
  '0x89': {
    chainId: '0x89',
    name: 'Polygon',
    label: 'Polygon',
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com',
    rpc: 'https://polygon-rpc.com',
  },
};
