/* eslint-disable no-underscore-dangle */
import { Text, useToast, VStack } from '@metafam/ds';
import { httpLink } from '@metafam/utils';
import type {
  GameProperties,
  GamePropertiesType,
  IGameContext,
  IGameState,
} from 'components/Landing/OnboardingGame/gameTypes';
import { MetaLink } from 'components/Link';
import { CONFIG } from 'config';
import { Contract } from 'ethers';
import { useWeb3 } from 'lib/hooks';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import gameJson from '../components/Landing/OnboardingGame/metagame-onboarding-game.json';
import ABI from '../contracts/BulkDisbursableNFTs.abi';
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
    return state;
  };

  /** Callback function to handle the users choices.
   *
   *  Takes the connected element id from the element's output and routes to the next step
   */
  const handleChoice = useCallback(
    async (target: string): Promise<string | undefined> => {
      try {
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

  const mintChiev = useCallback(
    async (tokenId: bigint): Promise<any> => {
      try {
        if (address === undefined) await connect();
        if (provider == null) throw new Error('Provider not set.');

        const contractAddress = CONFIG.chievContractAddress;
        const token = new Contract(contractAddress, ABI, provider.getSigner());
        const confirmationsWait = 2;
        const metadataURI = await token.uri(tokenId);
        if (!metadataURI || metadataURI === '') {
          throw new Error(`No metadata for token ${tokenId}.`);
        }
        toast({
          title: 'Claim in progress',
          description: 'Please sign the transaction in your wallet.',
          status: 'info',
          isClosable: true,
        });
        const response = await fetch(httpLink(metadataURI)!);
        const metadata = await response.json();
        const tx = await token['mint(address[],uint256,bytes)'](
          [address],
          tokenId,
          [],
        );

        toast({
          title: 'Chiev claim',
          description: (
            <>
              <Text>Transaction hash: {tx.hash}</Text>
              <Text>Waiting for {confirmationsWait} confirmations&hellip;</Text>
            </>
          ),
          status: 'info',
          isClosable: true,
          duration: 5000,
        });

        const receipt = await tx.wait(confirmationsWait);
        const receiptUrl = `${CONFIG.polygonscanBaseURL}/tx/${tx.hash}`;
        const nftURL = httpLink(metadata.external_url);

        set('ChievClaimed', 'true');

        toast({
          title: 'Chiev claimed 🎉',
          description: (
            <VStack spacing={2} textAlign="left" justifyItems="start">
              <Text textAlign="left">
                <MetaLink href={receiptUrl} isExternal>
                  View your receipt
                </MetaLink>{' '}
                👀
              </Text>
              {nftURL !== undefined && (
                <Text textAlign="left">
                  Check it out on{' '}
                  <MetaLink href={nftURL} isExternal>
                    chiev.es
                  </MetaLink>{' '}
                  🐙
                </Text>
              )}
            </VStack>
          ),
          status: 'success',
          isClosable: true,
          duration: 5000,
        });
        setTxLoading(false);

        return receipt;
      } catch (error: any) {
        console.log('mintChiev error', { error });
        const msg = (error?.reason as string) || 'unknown error';
        toast({
          title: 'Claim failed',
          description: msg,
          status: 'error',
          isClosable: true,
          duration: 5000,
        });
        return msg;
      }
    },
    [address, connect, provider, toast],
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
