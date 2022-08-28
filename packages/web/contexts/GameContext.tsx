/* eslint-disable no-underscore-dangle */
import { useToast } from '@metafam/ds';
import type {
  GameProperties,
  GamePropertiesType,
  IGameContext,
  IGameState,
} from 'components/Landing/OnboardingGame/gameTypes';
import { BigNumber, Contract, providers, utils } from 'ethers';
import { useWeb3 } from 'lib/hooks';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { providerOptions } from 'utils/walletOptions';
import Web3Modal from 'web3modal';

import ABI from '../components/Landing/OnboardingGame/chiev.abi.json';
import gameJson from '../components/Landing/OnboardingGame/metagame-onboarding-game.json';
import { get, remove, set } from '../lib/store';

export const GameContext = React.createContext<IGameContext>({
  game: {
    name: '',
    startingElement: '',
    assets: {},
    elements: {},
    jumpers: {},
    attributes: {},
    connections: {},
    components: {},
  },
  gameState: () => null,
  handleChoice: async () => undefined,
  resetGame: () => false,
  // typeText: () => '',
  fetchGameData: async () => {},
  visitedElements: () => '0',
  mintChiev: async () => '',
  connect: async () => undefined,
  disconnect: async () => undefined,
  loading: true,
  txLoading: false,
  account: '',
  network: '0x013881',
  connected: false,
  connecting: false,
});

export const GameContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);
  // const [walletConnected, setWalletConnected] = useState(false);
  const [gameDataState, setGameDataState] = useState<GamePropertiesType>();
  const {
    address,
    provider,
    connect,
    connecting,
    connected,
    chainId,
    disconnect,
  } = useWeb3();
  console.log('Web3Context', { connected, connecting, address });
  // const [library, setLibrary] = useState<any>();
  const [account, setAccount] = useState<any>(address ?? '');
  const toast = useToast();
  /** Function to async fetch `CONFIG.onboardingGameDataURL` as json and return the data
   * TODO: this needs the func from the main Game.tsx file to be moved here to replace
   * this function
   */
  const fetchGameData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Fetchng GameData...');

      // const response = await fetch(gameJson);
      // const data = (await response.json()) as GameProperties;
      const data = gameJson as GameProperties;
      console.log('fetchGameData', data);

      if (data) {
        setGameDataState(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (address) {
      setAccount(address);
      console.log('hexValue', utils.hexlify(80001));
    }
  }, [address]);

  const game = useMemo((): GameProperties => {
    try {
      if (!isLoading && gameDataState) {
        const {
          assets,
          name,
          startingElement,
          elements,
          connections,
          components,
        } = gameDataState;
        return {
          name,
          assets,
          startingElement,
          elements,
          connections,
          components,
        } as GameProperties;
      }
      return {
        name: '',
        assets: {},
        startingElement: '',
        elements: {},
        connections: {},
        components: {},
      } as GameProperties;
    } catch (error) {
      console.log('fetchGameData error: ', { error });
      return {
        name: '',
        startingElement: '',
        assets: {},
        elements: {},
        connections: {},
        components: {},
      } as GameProperties;
    }
  }, [gameDataState, isLoading]);

  /** Function to get, set or clear game state
   *
   * @param currentPlace - the current place of the player
   * @param reset - if true, clear the game state
   * @returns the game state or undefined if reset is true or the game state is not set
   */
  const gameState = (
    currentPlace?: string,
    reset?: boolean,
  ): IGameState['state'] => {
    if (currentPlace !== undefined) {
      set('OnboardingGameState', currentPlace);
    }
    if (reset) {
      remove('OnboardingGameState');
      remove('OnboardingGameVisitedElements');
    }

    const state = get('OnboardingGameState');
    console.log('Saved position', state);
    return state;
  };

  /** Callback function to handle the users choices.
   *
   *  Takes the connected element id from the element's output and routes to the next step
   */
  const handleChoice = useCallback(
    async (target: string): Promise<string | undefined> => {
      try {
        // console.log('handleChoice', target);

        // await fakeLoading(500);

        if (target) gameState(target);
        const success = gameState() === target;
        if (success) {
          return target;
        }
        throw new Error('Game progression failed');
      } catch (error) {
        // add toast here
        console.log(error);
        return undefined;
      }
    },
    [],
  );

  /** Increment number of elements a user has visited & store in localStorage
   * This is used to trigger an achievement after so many elements have been visited
   */
  const visitedElements = (increment?: boolean): string => {
    const visited: string | null = get('OnboardingGameVisitedElements');

    if (increment) {
      const incrementVisits = parseInt(visited ?? '0', 10) + 1;
      set(
        'OnboardingGameVisitedElements',
        visited ? incrementVisits.toString() : `1`,
      );
      return incrementVisits.toLocaleString();
    }

    return visited ?? '0';
  };

  const resetGame = useCallback((): boolean => {
    gameState(undefined, true);
    const success = gameState() === null;

    if (success) {
      return true;
    }
    return false;
  }, []);

  const getProviderOrSigner = useCallback(
    async (needSigner = false) => {
      try {
        // Connect to Metamask
        // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
        const web3Modal = new Web3Modal({
          network: 'mumbai',
          cacheProvider: true,
          providerOptions,
        });

        const prov = await web3Modal.connect();
        const web3Provider = new providers.Web3Provider(prov);
        console.log(
          'get provider/signer',
          { web3Provider, provider, prov },
          provider?.network.chainId,
        );
        // If user is not connected to the Rinkeby network, let them know and throw an error
        if (provider && provider.network.chainId !== 80001) {
          throw new Error(
            `Change network to Polygon Mumbai. Current: ${chainId}/${provider.network.chainId}`,
          );
        }

        if (needSigner) {
          const signer = web3Provider.getSigner();
          return signer;
        }
        return web3Provider;
      } catch (error: any) {
        console.log('getProviderOrSigner error', { error });
        const msg = (error?.message as string) || 'unknown error';
        toast({
          title: 'Wrong network',
          description: msg,
          status: 'warning',
          isClosable: true,
          duration: 5000,
        });
        return undefined;
      }
    },
    [chainId, provider, toast],
  );

  async function getNonce(signer: providers.JsonRpcSigner) {
    return (await signer).getTransactionCount();
  }

  const getGasPrice = useCallback(async (): Promise<BigNumber | null> => {
    try {
      if (provider) {
        const feeData = await provider.getFeeData();
        console.log('getGasPrice', feeData);

        return feeData.gasPrice;
      }
      return null;
    } catch (error) {
      console.log('getGasPrice error', { error });
      return null;
    }
  }, [provider]);

  const mintChiev = useCallback(
    async (tokenId: BigNumber): Promise<any> => {
      try {
        console.log('mintChiev', tokenId);

        if (address === undefined) await connect();
        const signerProvider = await getProviderOrSigner();
        console.log('signerProvider', signerProvider);

        if (signerProvider === undefined) return undefined;

        console.log('mintChiev account', { account, provider });
        const contractAddress = '0xa7787c91B35940AcC143E10C261A264f42F1e239';
        const currency = '0x0000000000000000000000000000000000001010';
        const quantity = BigNumber.from(1);
        // const web3Modal = new Web3Modal({
        //   network: 'mumbai',
        //   cacheProvider: true,
        //   providerOptions
        // });
        toast({
          title: 'Claim in progress',
          description: 'Please sign the transaction in your wallet.',
          status: 'info',
          isClosable: true,
        });
        console.log('Wallet connected', { account, provider });
        const signer = provider?.getSigner() as providers.JsonRpcSigner;
        const contract = new Contract(contractAddress, ABI, signer);
        const confirmations = 3;
        console.log('Contract', { contract, ABI, signer });
        const nonce = await getNonce(signer);
        const gasFee = await getGasPrice();
        const claimOptions = {
          receiver: account,
          tokenId,
          quantity,
          pricePerToken: utils.parseEther('0'),
          currency,
          proofs: [utils.formatBytes32String('')],
          proofMax: BigNumber.from('1'),
          value: utils.parseEther('0')._hex,
        };
        console.log('claim func', claimOptions, contract, gasFee, nonce);

        const tx = await contract.functions.claim(
          claimOptions.receiver,
          claimOptions.tokenId,
          claimOptions.quantity,
          claimOptions.currency,
          claimOptions.value,
          claimOptions.proofs,
          claimOptions.proofMax,
          {
            value: claimOptions.value,
            gasPrice: gasFee,
            gasLimit: BigNumber.from('9000000')._hex,
            nonce,
          },
        );
        if (tx) {
          console.log('tx', { claimOptions, tx });
          toast({
            title: 'Chiev claim',
            description: `Claim in progress: ${tx.hash}`,
            status: 'info',
            isClosable: true,
            duration: 5000,
          });
          setTxLoading(true);
          await tx.wait(confirmations);

          toast({
            title: 'Chiev claimed',
            description: `Your receipt: ${tx.hash}`,
            status: 'success',
            isClosable: true,
            duration: 5000,
          });
          setTxLoading(false);
          return tx.hash;
        }
        console.log('tx failed?', { claimOptions, tx });

        return tx;
        // throw new Error('No account');
      } catch (error: any) {
        console.log('mintChiev error', { error });
        const msg = (error?.message as string) || 'unknown error';
        toast({
          title: 'Claim failed',
          description: msg,
          status: 'error',
          isClosable: true,
          duration: 5000,
        });
        setTxLoading(false);
        return msg;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      account,
      address,
      connect,
      getGasPrice,
      getProviderOrSigner,
      provider,
      toast,
    ],
  );

  return (
    <GameContext.Provider
      value={{
        game,
        gameState,
        handleChoice,
        resetGame,
        fetchGameData,
        visitedElements,
        mintChiev,
        connect,
        disconnect,
        loading: isLoading,
        txLoading,
        account,
        network: chainId,
        connected,
        connecting,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): IGameContext => useContext(GameContext);
