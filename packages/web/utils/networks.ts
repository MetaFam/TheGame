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

export const mainnet = '0x1';
export const gnosis = '0x64';
export const polygon = '0x89';
export const mumbai = '0x013881';

export const NETWORK_INFO: NetworkInfo = {
  [mainnet]: {
    chainId: mainnet,
    name: 'Ethereum Mainnet',
    label: 'Ethereum',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: `https://mainnet.infura.io/v3/${CONFIG.infuraId}`,
  },
  [gnosis]: {
    chainId: gnosis,
    name: 'Gnosis Chain',
    label: 'Gnosis',
    symbol: 'xDAI',
    explorer: 'https://blockscout.com/xdai/mainnet',
    rpc: 'https://rpc.gnosischain.com/',
  },
  [polygon]: {
    chainId: polygon,
    name: 'Polygon',
    label: 'Polygon',
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com',
    rpc: 'https://polygon-rpc.com',
  },
  [mumbai]: {
    chainId: mumbai,
    name: 'Mumbai',
    label: 'Mumbai',
    symbol: 'MATIC',
    explorer: 'https://mumbai.polygonscan.com',
    rpc: 'https://matic-mumbai.chainstacklabs.com',
  },
};

export function getHexChainId(chain?: string): string {
  switch (chain?.toLowerCase()) {
    case 'xdai':
      return gnosis;
    case 'polygon':
      return polygon;
    case 'ethereum':
    default:
      return mainnet;
  }
}
