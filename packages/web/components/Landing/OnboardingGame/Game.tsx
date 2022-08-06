import {
  Box,
  Button,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@metafam/ds';
import { useGame } from 'contexts/GameContext';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useEffect, useRef, useState } from 'react';
import { safelyParseContent } from 'utils/stringHelpers';

import type { IConnection, IElement } from './gameTypes';

export type CurrentElementState = IElement & {
  elementId: string;
};
export type ConnectionStateItem = IConnection & {
  connectionId: string;
};

export const OnboardingGame: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { game, gameState, handleChoice, resetGame } = useGame();
  const { name, startingElement, elements, connections } = game;
  const [currentElement, setCurrentElement] = useState<CurrentElementState>();
  const [currentConnections, setCurrentConnections] =
    useState<ConnectionStateItem[]>();
  const [isLoading, setIsLoading] = useState(false);

  /** Sets the starting point for the game (startingElement or saved state) */
  const initGame = () => {
    const state = gameState();
    const element =
      state !== null ? elements[state] : elements[startingElement];

    if (state === null) {
      console.log('FreshGame', element);
      gameState(startingElement);
    }
    // console.log('from game state', { state, element }, elements[startingElement]);
    const elementData = { ...element, elementId: state ?? startingElement };
    setCurrentElement(elementData);
    // return element;
  };

  const handleProgress = (elementId: string) => {
    setIsLoading(true);
    console.log('handleProgress', currentElement);
    handleChoice(elementId)
      .then((data) => {
        console.log('handleChoice', data);
        const nextElement =
          data !== undefined
            ? { ...elements[data], elementId: data }
            : undefined;
        if (nextElement !== undefined) {
          setCurrentElement(nextElement);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('handleProgress error: ', { err });
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
          const connectionData = { ...connections[id], connectionId: id };
          return connectionData;
        });

        console.log('getConnections', { connectionIds, elementConnections });
        setCurrentConnections(elementConnections);
        return elementConnections;
      }
      throw new Error('No connections found');
    } catch (error) {
      console.log('getConnections ', { error });
      return undefined;
    }
  };

  useEffect(() => {
    console.log('OnboardingGame: useEffect');
    console.log('OnboardingGame: game', { game });
    console.log('OnboardingGame: gameState', {
      name,
      startingElement,
      elements,
    });
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentElement !== undefined && currentElement.outputs !== null) {
      const { outputs } = currentElement;
      console.log('OnboardingGame: get connections useEffect', {
        currentElement,
        outputs,
      });

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
      <Box
        ref={ref}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        color="var(--chakra-colors-landing550)"
        textShadow={`0 0 10px var(--chakra-colors-landing500)`}
        maxWidth="2xl"
        fontSize={{ base: '1.5rem', md: '5xl', xl: '4xl', '2xl': '3rem' }}
        lineHeight={{
          base: '2.25rem',
          md: '2rem',
          xl: '2rem',
          '2xl': '4rem',
        }}
        pl={{ base: 0, md: 0 }}
        zIndex={100}
        transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
      >
        {currentElement !== undefined ? (
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
                },
              }}
            >
              {currentElement.title
                ? safelyParseContent(currentElement.title)
                : null}
              {currentElement.content
                ? safelyParseContent(currentElement.content)
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
                    console.log('connection', { connection });

                    return (
                      <ListItem
                        key={connection.connectionId}
                        className="response"
                        ml={0}
                        mb={3}
                      >
                        <Button
                          onClick={() => handleProgress(connection.targetid)}
                          variant="ghost"
                          px={0}
                          py={0}
                          lineHeight={1}
                          fontWeight="normal"
                          textShadow={`0 0 8px var(--chakra-colors-landing500)`}
                          borderBottom="2px solid var(--chakra-colors-landing550)"
                          borderRadius="inherit inherit 0 0"
                          _hover={{
                            backgroundColor: 'transparent',
                            color: 'var(--chakra-colors-landing500)',
                            borderBottom:
                              '2px solid var(--chakra-colors-landing500)',
                          }}
                          fontSize="lg"
                        >
                          {connection.label
                            ? safelyParseContent(connection.label)
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
              {isLoading ? (
                <Spinner position="absolute" top={0} right={0} />
              ) : null}
            </Box>
          </Box>
        ) : (
          <Heading as="h2" fontFamily="onboarding">
            Wake up, Anon...
          </Heading>
        )}
      </Box>
    </Box>
  );
};

export interface GameData {
  data: string;
}
