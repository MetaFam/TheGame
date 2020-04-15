import React, {createContext, useCallback, useState} from "react";
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import Web3 from 'web3';

import config from '../config';

export const Web3Context = createContext({
  web3Provider: null,
  address: null,
  connectWeb3: () => {},
});

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: config.infuraId,
    }
  }
};

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
});


const Web3ContextProvider = props => {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState(null);

  const connectWeb3 = useCallback(async () => {

    const provider = await web3Modal.connect();
    const web3Provider = new Web3(provider);
    setWeb3Provider(web3Provider);
    web3Provider.eth.getAccounts().then(accounts => setAddress(accounts[0]))

  }, []);

  return (
    <Web3Context.Provider value={{ web3Provider, address, connectWeb3 }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
