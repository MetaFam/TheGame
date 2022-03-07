import WalletConnectProvider from '@walletconnect/web3-provider';

import { NETWORK_INFO } from './networks';

const rpcUrls = Object.fromEntries(
  Object.entries(NETWORK_INFO).map(([hexId, { rpc }]) => [Number(hexId), rpc]),
);

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: rpcUrls,
    },
  },
};
