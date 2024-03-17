import { Text, useToast, VStack } from '@metafam/ds';
import { httpLink } from '@metafam/utils';
import type {
  GameProperties,
  IGameContext,
  IGameState,
} from 'components/Landing/OnboardingGame/gameTypes';
import gameJson from 'components/Landing/OnboardingGame/metagame-onboarding-game.json';
import { chievContractAddress } from 'components/Landing/OnboardingGame/nft';
import { MetaLink } from 'components/Link';
import ABI from 'contracts/BulkDisbursableNFTs.abi';
import { Contract } from 'ethers';
import { ContractError } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import { get, remove, set } from 'lib/store';
import type { PropsWithChildren } from 'react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { errorHandler } from 'utils/errorHandler';
import { NETWORK_INFO, POLYGON } from 'utils/networks';

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
  visitedElements: () => '0',
  mintChiev: async () => '',
  disconnect: async () => undefined,
  txLoading: false,
  account: '',
  network: '0x013881',
  connected: false,
  connecting: false,
});

export const GameContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [txLoading, setTxLoading] = useState(false);
  const gameDataState = gameJson as GameProperties;
  const { address, provider, connecting, connected, chainId, disconnect } =
    useWeb3();
  const [account, setAccount] = useState(address ?? '');
  const toast = useToast();

  useEffect(() => {
    if (address) {
      setAccount(address);
    }
  }, [address]);

  const game = useMemo((): GameProperties => {
    const { assets, name, startingElement, elements, connections, components } =
      gameDataState;
    return {
      name,
      assets,
      startingElement,
      elements,
      connections,
      components,
    } as GameProperties;
  }, [gameDataState]);

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
        errorHandler(error as Error);
        console.error(error);
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
    async (tokenId: bigint) => {
      try {
        if (provider == null) throw new Error('Provider not set.');
        setTxLoading(true);

        const token = new Contract(
          chievContractAddress,
          ABI,
          provider.getSigner(),
        );
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
        const response = await fetch(httpLink(metadataURI) ?? '');
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
        const receiptUrl = `${NETWORK_INFO[POLYGON].explorer}/tx/${tx.hash}`;
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

        return receipt;
      } catch (err) {
        const error = err as ContractError;
        console.error('mintChiev error', { error });
        const msg = error.reason ?? error.message ?? 'Unknown error.';
        toast({
          title: 'Claim Failed',
          description: msg,
          status: 'error',
          isClosable: true,
          duration: 5000,
        });
        errorHandler(error);
        return msg;
      } finally {
        setTxLoading(false);
      }
    },
    [address, provider, toast],
  );

  return (
    <GameContext.Provider
      value={{
        game,
        gameState,
        handleChoice,
        resetGame,
        visitedElements,
        mintChiev,
        disconnect,
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
