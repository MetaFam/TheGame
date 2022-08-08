import {
  Box,
  Button,
  ExternalLinkIcon,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@metafam/ds';
import externalLinkIcon from 'assets/landing/external-link-icon.png';
import { CONFIG } from 'config';
import { useGame } from 'contexts/GameContext';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { safelyParseContent } from 'utils/stringHelpers';

import type {
  GameProperties,
  GamePropertiesType,
  IConnection,
  IElement,
} from './gameTypes';

export type CurrentElementState = IElement & {
  elementId: string;
};
export type ConnectionStateItem = IConnection & {
  connectionId: string;
};

export const OnboardingGame: React.FC = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { gameState, handleChoice, resetGame, loading } = useGame();
  const [currentElement, setCurrentElement] = useState<CurrentElementState>();
  const [currentConnections, setCurrentConnections] =
    useState<ConnectionStateItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [gameDataState, setGameDataState] = useState<GamePropertiesType | null>(
    null,
  );
  /** Function to async fetch `CONFIG.onboardingGameDataURL` as json and return the data */
  const fetchGameData = useCallback(async () => {
    try {
      // setIsLoading(true);
      console.log('fetchGameData');

      const response = await fetch(CONFIG.onboardingGameDataURL);
      const data = (await response.json()) as GameProperties;
      console.log('fetchGameData', data);
      const {
        assets,
        name,
        startingElement,
        elements,
        connections,
        components,
      } = data;
      // setGameDataState(data);
      // setIsLoading(false);
      return {
        name,
        assets,
        startingElement,
        elements,
        connections,
        components,
      } as GameProperties;
    } catch (error) {
      console.error(error);

      // setIsLoading(false);
      return {
        name: '',
        assets: {},
        startingElement: '',
        elements: {},
        connections: {},
        components: {},
      } as GameProperties;
    }
  }, []);
  /** Sets the starting point for the game (startingElement or saved state) */
  const initGame = () => {
    setIsLoading(true);
    // if (gameDataState === null) {
    // return element;
    fetchGameData()
      .then((data) => {
        if (data) {
          setGameDataState(data);
          const state = gameState();
          const element =
            state !== null
              ? data.elements[state]
              : data.elements[data.startingElement];
          console.log('gameDataState', data);
          const elementData = {
            ...element,
            elementId: state ?? data.startingElement,
          };
          console.log('elementData', elementData);

          setCurrentElement(elementData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    // }
    // const state = gameState();
    // const element =
    //   state !== null ? elements[state] : elements[startingElement];

    // if (state === null) {
    //   console.log('FreshGame', element);
    //   gameState(startingElement);
    // }
    // // console.log('from game state', { state, element }, elements[startingElement]);
    // const elementData = { ...element, elementId: state ?? startingElement };
    // setCurrentElement(elementData);
  };

  const handleProgress = (elementId: string) => {
    setIsLoading(true);
    // console.log('handleProgress', currentElement);
    handleChoice(elementId)
      .then((data) => {
        // console.log('handleChoice', data);
        const nextElement =
          data !== undefined
            ? { ...gameDataState?.elements[data], elementId: data }
            : undefined;
        if (nextElement !== undefined) {
          setCurrentElement(nextElement);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log('handleProgress error: ', { err });
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    const isReset = resetGame();
    if (isReset) {
      initGame();
    }
  };

  /** Get the connections for the current element */
  const getConnections = (connectionIds: string[]) => {
    try {
      if (connectionIds.length > 0) {
        const elementConnections = connectionIds.map((id: string) => {
          const connectionData = {
            ...gameDataState?.connections[id],
            connectionId: id,
          };
          return connectionData;
        });

        // console.log('getConnections', { connectionIds, elementConnections });
        setCurrentConnections(elementConnections);
        return elementConnections;
      }
      throw new Error('No connections found');
    } catch (error) {
      // console.log('getConnections ', { error });
      return undefined;
    }
  };

  useEffect(() => {
    console.log('OnboardingGame: useEffect');
    // console.log('OnboardingGame: game', { game });
    // console.log('OnboardingGame: gameState', {
    //   name,
    //   startingElement,
    //   elements,
    // });
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentElement !== undefined && currentElement.outputs !== null) {
      const { outputs } = currentElement;
      // console.log('OnboardingGame: get connections useEffect', {
      //   currentElement,
      //   outputs,
      // });

      getConnections(currentElement.outputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100%"
      fontFamily="onboarding"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      py={32}
    >
      {!isLoading && gameDataState !== null ? (
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          color="var(--chakra-colors-landing550)"
          textShadow={`0 0 10px var(--chakra-colors-landing500)`}
          maxW="2xl"
          width="100%"
          fontSize={{ base: '1.5rem', md: '5xl', xl: '4xl', '2xl': '3rem' }}
          lineHeight={{
            base: '2.25rem',
            md: '2rem',
            xl: '2rem',
            '2xl': '4rem',
          }}
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${'0'}, 0)`}
          opacity={1}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          {/* {currentElement !== undefined ? ( */}
          <Box className="step">
            <Box
              className="question"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                lineHeight: 1,
                mb: 5,
                p: {
                  fontSize: 'lg',
                  marginBottom: '1rem',
                  opacity: isLoading ? 0.2 : 1,
                  transform: isLoading
                    ? 'translate3d(0, -10px, 0)'
                    : 'translate3d(0, 0, 0)',
                  transition:
                    'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in',
                },
                a: {
                  position: 'relative',
                  color: 'var(--chakra-colors-landing550)',
                  '&::after': {
                    content: '" "',
                    display: 'block',
                    position: 'absolute',
                    right: -10,
                    top: 0,
                    width: '1rem',
                    height: '1rem',
                    backgroundImage: `url(${externalLinkIcon})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem',
                    backgroundPosition: 'center',
                    filter:
                      'drop-shadow(0 0 0.5rem var(--chakra-colors-landing500))',
                  },
                },
              }}
            >
              {currentElement?.title
                ? safelyParseContent(currentElement?.title)
                : null}
              {currentElement?.content
                ? safelyParseContent(currentElement?.content)
                : null}
            </Box>
            <Box
              className="responses"
              fontSize="lg"
              opacity={isLoading ? 0 : 1}
              transform={`translate3d(0, ${isLoading ? 1 : 0}, 0)`}
              lineHeight={1}
              transition="opacity 0.2s 0.2s ease-in, transform 0.3s 0.1s ease-in-out"
            >
              <UnorderedList
                listStyleType="none"
                display="flex"
                flexFlow="column wrap"
                alignItems="flex-start"
                ml={0}
              >
                {currentConnections && currentConnections.length > 0 ? (
                  currentConnections.map((connection: ConnectionStateItem) => {
                    const { label } = connection as ConnectionStateItem;
                    const btnText = safelyParseContent(label) as ReactElement;
                    // console.log('btnText', btnText.props.children);

                    return (
                      <ListItem
                        key={connection.connectionId}
                        className="response"
                        maxW={'md'}
                        ml={0}
                        mb={3}
                      >
                        <Button
                          onClick={() => handleProgress(connection.targetid)}
                          variant="ghost"
                          px={0}
                          py={0}
                          display="inline-block"
                          fontWeight="normal"
                          textShadow={`0 0 8px var(--chakra-colors-landing500)`}
                          borderBottom="2px solid var(--chakra-colors-landing550)"
                          borderRadius="inherit inherit 0 0"
                          wordBreak="break-word"
                          textAlign="left"
                          maxW="md"
                          width={'100%'}
                          _hover={{
                            backgroundColor: 'transparent',
                            color: 'var(--chakra-colors-landing500)',
                            borderBottom:
                              '2px solid var(--chakra-colors-landing500)',
                          }}
                          fontSize="lg"
                          sx={{
                            '& > p': {
                              display: 'inline-block',
                            },
                          }}
                        >
                          {connection.label
                            ? btnText.props.children
                            : 'What else?'}
                        </Button>
                      </ListItem>
                    );
                  })
                ) : (
                  <Box>
                    <Text mb={5}>Tumbleweed rolls by...</Text>
                  </Box>
                )}
              </UnorderedList>
              <Button variant="ghost" onClick={handleReset}>
                Start again
              </Button>
            </Box>
          </Box>
          {/* ) : (
            <Heading as="h2" fontFamily="onboarding">
              Wake up, Anon...
            </Heading>
          )} */}
        </Box>
      ) : (
        <Spinner
          color="landing550"
          textShadow={`0 0 8px var(--chakra-colors-landing500)`}
        />
      )}
    </Box>
  );
};

export interface GameData {
  data: string;
}
