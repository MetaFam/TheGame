import { Text, useToast, VStack } from '@metafam/ds';
import { httpLink, Maybe } from '@metafam/utils';
import { uri } from '@ucanto/core/schema/uri';
import type {
  GameProperties,
  IGameContext,
  IGameState,
} from 'components/Landing/OnboardingGame/gameTypes';
import gameJson from 'components/Landing/OnboardingGame/metagame-onboarding-game.json';
import {
  chievContractAddress,
  chievId,
} from 'components/Landing/OnboardingGame/nft';
import { MetaLink } from 'components/Link';
import ABI from 'contracts/BulkDisbursableNFTs.abi';
import { Contract } from 'ethers';
import { ContractError } from 'graphql/types';
import { useEthersSigner } from 'lib/hooks/userEthersSigner';
import { get, remove, set } from 'lib/store';
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { errorHandler } from 'utils/errorHandler';
import { NETWORK_INFO, OPTIMISM } from 'utils/networks';
import { optimism } from 'viem/chains';
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

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
  handleChoice: async () => {},
  reset: () => false,
  visited: () => '0',
  mint: async () => '',
  disconnect: async () => {},
  txLoading: false,
  account: '',
  network: 0x013881,
  connected: false,
  connecting: false,
});

export const GameContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [txLoading, setTxLoading] = useState(false);
  const gameDataState = gameJson as GameProperties;
  const {
    address,
    isConnecting: connecting,
    isConnected: connected,
    chainId,
  } = useAccount();
  const { disconnect } = useDisconnect();
  const provider = useEthersSigner();
  const [account, setAccount] = useState(address ?? '');
  const debug = !!useRouter().query.debug;
  const toast = useToast();
  const confirmations = 2;

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
    async (target: string): Promise<string | void> => {
      try {
        if (target) gameState(target);
        if (gameState() === target) {
          return target;
        }
        throw new Error('Game progression failed.');
      } catch (error) {
        errorHandler(error as Error);
        console.error(error);
      }
      return undefined;
    },
    [],
  );

  /** Increment number of elements a user has visited & store in localStorage
   * This is used to trigger an achievement after so many elements have been visited
   */
  const visited = (increment?: boolean): string => {
    const count: string | number = get('OnboardingGameVisitedElements') ?? 0;

    if (increment) {
      const incremented = Number(count) + 1;
      set('OnboardingGameVisitedElements', String(incremented));
      return incremented.toLocaleString();
    }

    return String(count);
  };

  const reset = useCallback((): boolean => {
    gameState(undefined, true);
    return gameState() === null;
  }, []);

  const {
    data: metadataURI,
    error: uriError,
  }: {
    data?: string;
    error: Maybe<Error>;
  } = useReadContract({
    abi: ABI,
    address: chievContractAddress,
    functionName: 'uri',
    args: [chievId],
    chainId: optimism.id,
  });
  if (uriError) throw uriError;
  const {
    writeContract,
    data: hash,
    isPending: pending,
    error: mintError,
  } = useWriteContract();
  if (mintError) throw mintError as Error;
  const {
    isLoading: confirming,
    isSuccess: confirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations,
  });

  const mint = useCallback(async () => {
    try {
      if (provider == null) throw new Error('Provider not set.');
      setTxLoading(true);

      if (!metadataURI || metadataURI === '') {
        throw new Error(`No metadata for token ${chievId}.`);
      }
      toast({
        title: 'Claim In Progress',
        description: 'Please sign the transaction in your wallet.',
        status: 'info',
        isClosable: true,
      });
      // eslint-disable-next-line no-console
      if (debug) console.debug({ metadataURI });
      const response = await fetch(httpLink(metadataURI) ?? '');
      const metadata = await response.json();
      writeContract(
        {
          abi: ABI,
          address: chievContractAddress,
          functionName: 'mint',
          args: [[address], chievId, ''],
          chainId: optimism.id,
        },
        {
          onSuccess: () => {
            set('ChievClaimed', 'true');

            const receiptUrl = `${NETWORK_INFO[OPTIMISM].explorer}/tx/${hash}`;
            const nftURL = httpLink(metadata.external_url);

            toast({
              title: 'Chiev Claimed 🎉',
              description: (
                <VStack spacing={2} textAlign="left" justifyItems="start">
                  <Text textAlign="left">
                    <MetaLink href={receiptUrl} isExternal>
                      View your receipt.
                    </MetaLink>{' '}
                    👀
                  </Text>
                  {nftURL && (
                    <Text textAlign="left">
                      Check it out on{' '}
                      <MetaLink href={nftURL} isExternal>
                        op.chiev.es.
                      </MetaLink>{' '}
                      🐙
                    </Text>
                  )}
                </VStack>
              ),
              status: 'success',
              isClosable: true,
              duration: 7500,
            });
          },
          onError: (error: Error) => {
            throw error;
          },
        },
      );
      // toast({
      //   title: 'Chiev Claim',
      //   description: (
      //     <>
      //       <Text>Transaction hash: {tx.hash}</Text>
      //       <Text>Waiting for {confirmationsWait} confirmations&hellip;</Text>
      //     </>
      //   ),
      //   status: 'info',
      //   isClosable: true,
      //   duration: 5000,
      // });

      return receipt;
    } catch (err) {
      const error = err as ContractError;
      console.error({ 'mintChiev error': error });
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
  }, [
    address,
    debug,
    hash,
    metadataURI,
    provider,
    receipt,
    toast,
    writeContract,
  ]);

  return (
    <GameContext.Provider
      value={{
        game,
        gameState,
        handleChoice,
        reset,
        visited,
        mint,
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
