import type {
  IElementsObject,
  IGameContext,
  IGameState,
} from 'components/Landing/OnboardingGame/gameTypes';
import { NextRouter, useRouter } from 'next/router';
import { type } from 'os';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import gameJson from '../components/Landing/OnboardingGame/game.json';
import { get, remove, set } from '../lib/store';

export const GameContext = React.createContext<IGameContext>({
  game: {
    name: '',
    startingElement: '',
    assets: {},
    elements: {},
    connections: {},
    components: {},
  },
  gameState: () => null,
  handleChoice: async () => undefined,
  resetGame: () => false,
});

export const GameContextProvider: React.FC = ({ children }) => {
  const game = useMemo(() => {
    const { name, startingElement, elements, connections } = gameJson;
    return {
      name,
      startingElement,
      elements,
      connections,
    };
  }, []);

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
      console.log('set game state', currentPlace);
      // return state
    }
    if (reset) {
      remove('OnboardingGameState');
      console.log('reset game state');
      // return state;
    }

    const state = get('OnboardingGameState');
    console.log('get game state', state);
    return state;
  };

  const fakeLoading = (delay: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, delay);
    });

  const router = useRouter();

  /** Callback function to handle the users choices.
   *
   *  Takes the connected element id from the element's output and routes to the next step
   */
  const handleChoice = useCallback(
    async (target: string): Promise<string | undefined> => {
      try {
        await fakeLoading(3000);

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

  const resetGame = useCallback((): boolean => {
    gameState(undefined, true);
    const success = gameState() === null;

    if (success) {
      return true;
    }
    return false;
  }, []);

  return (
    <GameContext.Provider
      value={{
        game,
        gameState,
        handleChoice,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): IGameContext => useContext(GameContext);
