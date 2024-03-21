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
export const OPTIMISM = '0xa';

export const NETWORK_INFO: NetworkInfo = {
  [MAINNET]: {
    chainId: MAINNET,
    name: 'Ethereum Mainnet',
    label: 'Ethereum',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET}`,
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
    rpc: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MATIC}`,
  },
  [MUMBAI]: {
    chainId: MUMBAI,
    name: 'Mumbai',
    label: 'Mumbai',
    symbol: 'MATIC',
    explorer: 'https://mumbai.polygonscan.com',
    rpc: 'https://matic-mumbai.chainstacklabs.com',
  },
  [OPTIMISM]: {
    chainId: OPTIMISM,
    name: 'Optimism',
    label: 'Optimism',
    symbol: 'ETH',
    explorer: 'https://optimistic.etherscan.io/',
    rpc: 'https://op-pokt.nodies.app',
  },
};

export function getHexChainId(chain?: string): string {
  switch (chain?.toLowerCase()) {
    case 'xdai':
      return GNOSIS;
    case 'polygon':
      return POLYGON;
    case 'ethereum':
      return MAINNET;
    case 'op mainnet':
      return OPTIMISM;
    default:
      return MAINNET;
  }
}

export const getNumberId = (chainId: string): number => {
  return parseInt(chainId, 16);
}