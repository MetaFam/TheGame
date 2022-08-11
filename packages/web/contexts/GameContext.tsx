import type {
  GameProperties,
  GamePropertiesType,
  IGameContext,
  IGameState,
} from 'components/Landing/OnboardingGame/gameTypes';
import { CONFIG } from 'config';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import React, { useCallback, useContext, useMemo, useState } from 'react';

// import gameJson from '../components/Landing/OnboardingGame/metagame-onboarding-game.json';
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
  typeText: () => '',
  fetchGameData: async () => {},
  loading: true,
});

export const GameContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameDataState, setGameDataState] = useState<GamePropertiesType>();

  /** Function to async fetch `CONFIG.onboardingGameDataURL` as json and return the data */
  const fetchGameData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('fetchGameData');

      const response = await fetch(CONFIG.onboardingGameDataURL);
      const data = (await response.json()) as GameProperties;
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

  // const typingText = useCallback((text: string) => { });

  // useEffect(() => {
  //   if (gameDataState === undefined) {
  //     fetchGameData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const game = useMemo((): GameProperties => {
    try {
      if (!isLoading && gameDataState) {
        console.log('gameDataState', gameDataState);

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

  /** Callback function to handle the users choices.
   *
   *  Takes the connected element id from the element's output and routes to the next step
   */
  const handleChoice = useCallback(
    async (target: string): Promise<string | undefined> => {
      try {
        await fakeLoading(500);

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

  const typeText = (name: string): string => {
    if (typeof window !== 'undefined') {
      const textElement = document.querySelector(`[data-typeout="${name}"]`);
      gsap.registerPlugin(TextPlugin);
      const text = textElement?.textContent ?? '';
      console.log('typeText', textElement?.textContent);
      const tl = gsap.timeline({
        paused: true,
        reversed: true,
        opacity: 0,
        defaults: { duration: 0.5 },
      });
      if (textElement !== null) {
        tl.to(textElement, {
          text,
          ease: 'power1.inOut',
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        tl.reversed() ? tl.play() : tl.reverse();
        return text;
      }
    }
    return '';
  };

  return (
    <GameContext.Provider
      value={{
        game,
        gameState,
        handleChoice,
        resetGame,
        typeText,
        fetchGameData,
        loading: isLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): IGameContext => useContext(GameContext);
