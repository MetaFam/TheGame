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

export const MAINNET = '0x1';
export const GOERLI = '0x5';
export const GNOSIS = '0x64';
export const POLYGON = '0x89';
export const MUMBAI = '0x013881';

export const NETWORK_INFO: NetworkInfo = {
  [MAINNET]: {
    chainId: MAINNET,
    name: 'Ethereum Mainnet',
    label: 'Ethereum',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: `https://mainnet.infura.io/v3/${CONFIG.infuraId}`,
  },
  [GOERLI]: {
    chainId: GOERLI,
    name: 'Goerli Testnet',
    label: 'Goerli',
    symbol: 'ETH',
    explorer: 'https://goerli.etherscan.io',
    rpc: `https://goerli.infura.io/v3/${CONFIG.infuraId}`,
  },
  [GNOSIS]: {
    chainId: GNOSIS,
    name: 'Gnosis Chain',
    label: 'Gnosis',
    symbol: 'xDAI',
    explorer: 'https://blockscout.com/xdai/mainnet',
    rpc: 'https://rpc.gnosischain.com/',
  },
  [POLYGON]: {
    chainId: POLYGON,
    name: 'Polygon',
    label: 'Polygon',
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com',
    rpc: 'https://polygon-rpc.com',
  },
  [MUMBAI]: {
    chainId: MUMBAI,
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
      return GNOSIS;
    case 'polygon':
      return POLYGON;
    case 'ethereum':
    default:
      return MAINNET;
  }
}
