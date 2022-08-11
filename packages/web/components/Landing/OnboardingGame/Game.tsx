import {
  Box,
  BoxedNextImage,
  Button,
  keyframes,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@metafam/ds';
import externalLinkIcon from 'assets/landing/external-link-icon.png';
import octoImg from 'assets/octopus.png';
import { CONFIG } from 'config';
import { useGame } from 'contexts/GameContext';
import { parse } from 'node:path/win32';
// import { useOnScreen } from 'lib/hooks/useOnScreen';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import {
  safelyParseContent,
  safelyParseTextForTyping,
} from 'utils/stringHelpers';

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
  // const onScreen = useOnScreen(ref);
  const { gameState, handleChoice, resetGame } = useGame();
  const [currentElement, setCurrentElement] = useState<CurrentElementState>();
  const [currentConnections, setCurrentConnections] =
    useState<ConnectionStateItem[]>();
  const [currentDialogue, setCurrentDialogue] =
    useState<CurrentSectionDialogueChoices['currentDialogue']>();
  const [currentChoices, setCurrentChoices] =
    useState<CurrentSectionDialogueChoices['currentChoices']>();
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [gameDataState, setGameDataState] = useState<GamePropertiesType | null>(
    null,
  );
  const [welcomeBack, setWelcomeBack] = useState(false);
  const blink = keyframes`
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;

    }

    100% {
      opacity: 0;
    }
  `;
  const typingAnimation = `${blink} 1s steps(10, start) infinite`;
  const pulseAnimation = `${blink} 2s infinite`;

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

          // console.log('gameDataState', data);
          const elementData = {
            ...element,
            elementId: state ?? data.startingElement,
          };
          // console.log('elementData', elementData);

          setCurrentElement(elementData);
          makeCurrentSectionDialogue(elementData);
        }
        return data;
      })
      .then((data) => {
        if (data) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
      .finally(() => {});
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

  /** for returning players */
  useEffect(() => {
    const state = gameState();
    if (state && gameDataState !== null) {
      const isReturning = state !== gameDataState.startingElement;
      setWelcomeBack(isReturning);
      setTimeout(() => {
        setWelcomeBack(false);
      }, 6000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameDataState]);

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentElement !== undefined && currentElement.outputs !== null) {
      getConnections(currentElement.outputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

  interface CurrentSectionDialogueChoices {
    currentDialogue: JSX.Element[];
    currentChoices: JSX.Element[];
  }
  /**
   * Sanitizes & splits the element content into dialogue and
   * choices, adds them to state & returns the values if you want to use it that way */
  const makeCurrentSectionDialogue = (
    section: CurrentElementState,
  ): CurrentSectionDialogueChoices => {
    // if (typeof window === 'undefined') return;
    const { content, title } = section;
    let parsedContent: any;
    const dialogue: any[] = [];
    const choices: any[] = [];
    if (content !== null || title !== null) {
      console.log('makeCurrentSectionDialogue', { content, title });

      if (title !== null && content !== null) {
        const string = `${title}${content}`;
        console.log('string', string);

        parsedContent = safelyParseTextForTyping(string);
      } else {
        parsedContent = safelyParseTextForTyping(content ?? title);
      }
    }

    console.log('parsedContent', parsedContent);

    /**
     * if it is set, take the parsedContent, find & push paragraphs that contain *no* links as child elements
     * into the `dialogue` array.
     * if the paragraph has a link, push it into the `choices` array.
     */
    if (parsedContent.length > 0) {
      parsedContent.forEach((paragraph: JSX.Element) => {
        const { children } = paragraph.props;

        if (children) {
          const hasLink = children.type === 'a';
          if (!hasLink) {
            dialogue.push(paragraph);
          } else {
            choices.push(children);
          }
        }
      });
      console.log('makeCurrentSectionDialog', { dialogue, choices });
    }
    setCurrentDialogue(dialogue);
    setCurrentChoices(choices);
    return {
      currentDialogue: dialogue,
      currentChoices: choices,
    };
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && currentDialogue !== undefined) {
      // makeCurrentSectionDialogue(currentElement);
      const elementsToType = document.querySelectorAll('.typing-text');
      // console.log('elementsToType', elementsToType);

      const phrases: string[] = [];
      elementsToType.forEach((element) => {
        if (element.textContent !== null) {
          phrases.push(element.textContent);
        }
        // eslint-disable-next-line no-param-reassign
        element.textContent = '';
      });

      let i = 0;
      let j = 0;
      let currentPhrase: string[] = [];
      let hasEnded = false;
      setIsTyping(true);
      const loop = () => {
        if (i < elementsToType.length) {
          if (j <= phrases[i].length) {
            elementsToType[i].classList.add('typing');

            currentPhrase.push(phrases[i][j]);

            elementsToType[i].textContent = currentPhrase.join('');
            elementsToType[i].appendChild(document.createElement('span'));
            j++;
          }

          if (j === phrases[i].length) {
            if (i < elementsToType.length - 1) {
              elementsToType[i].classList.remove('typing');
            }
            currentPhrase = [];
            j = 0;
            i++;
          }
          if (i === phrases.length) {
            hasEnded = true;
            setIsTyping(false);
          }
        }

        const randomiseSpeed = Math.random() * (100 - 5) + 5;
        setTimeout(loop, randomiseSpeed);
      };
      loop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentElement]);

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
          makeCurrentSectionDialogue(nextElement);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('handleProgress error: ', { err });
        setIsLoading(false);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100%"
      fontFamily="onboarding"
      justifyContent={isLoading ? 'center' : 'flex-start'}
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
          pt={{ base: 10, md: 20 }}
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
                mb: 2,
                p: {
                  fontSize: 'large',
                  lineHeight: '1.7rem',
                  marginBottom: '1rem',
                  opacity: isLoading ? 0 : 1,
                  transform: isLoading
                    ? 'translate3d(0, -10px, 0)'
                    : 'translate3d(0, 0, 0)',
                  transition:
                    'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in',
                },

                '.typing-text': {
                  '&.typing': {
                    span: {
                      display: 'inline-block',
                      right: 0,
                      bottom: 0,
                      transform: 'translate3d(-2px, 1px, 0)',
                      height: '1rem',
                      width: 0,
                      borderLeft: '2px solid var(--chakra-colors-landing550)',
                      filter:
                        'drop-shadow(0 0 0.5rem var(--chakra-colors-landing500))',
                      animation: typingAnimation,
                    },
                  },
                },
              }}
            >
              <Box
                opacity={welcomeBack ? 1 : 0}
                transition="all 0.3s ease"
                fontSize="3xl"
                aria-hidden={welcomeBack ? 'false' : 'true'}
                mb={6}
                textAlign="center"
              >
                Welcome back Anon!
              </Box>

              {currentElement &&
                currentDialogue !== undefined &&
                currentDialogue.map((dialogue, index) => dialogue)}
            </Box>
            <Box
              className="responses"
              fontSize="large"
              lineHeight={1}
              sx={{
                p: {
                  fontSize: 'large',
                  lineHeight: '1.7rem',
                  marginBottom: '1rem',
                  opacity: isLoading ? 0 : 1,
                  transform: isLoading
                    ? 'translate3d(0, -10px, 0)'
                    : 'translate3d(0, 0, 0)',
                  transition:
                    'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in',
                },
                a: {
                  position: 'relative',
                  display: 'inline-flex',
                  lineHeight: '1.7rem',
                  color: 'var(--chakra-colors-landing550)',
                  borderBottom: '2px solid var(--chakra-colors-landing550)',
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
              <UnorderedList
                listStyleType="none"
                display="flex"
                flexFlow="column wrap"
                alignItems="flex-start"
                ml={0}
                opacity={isTyping ? 0 : 1}
                transition="all 0.3s ease"
              >
                {currentElement &&
                  currentChoices &&
                  currentChoices.map((choice, i) => (
                    <ListItem
                      key={`${choice.props.href}-${i}`}
                      className="response"
                      width="100%"
                      ml={0}
                      mb={3}
                      opacity={isTyping ? 0 : 1}
                      transform={`translate3d(0, ${isTyping ? -10 : 0}, 0)`}
                      lineHeight={1}
                      transition={`opacity 0.3s 0.${
                        i * 3
                      }s ease-in, transform 0.2s 0.${i * 3}s ease-in-out`}
                    >
                      {choice}
                    </ListItem>
                  ))}
                {currentConnections && currentConnections.length > 0 ? (
                  currentConnections.map(
                    (connection: ConnectionStateItem, i: number) => {
                      const { label } = connection as ConnectionStateItem;
                      const btnText = safelyParseContent(label) as ReactElement;
                      // console.log('btnText', btnText.props.children);

                      return (
                        <ListItem
                          key={connection.connectionId}
                          className="response"
                          width="100%"
                          ml={0}
                          mb={3}
                          opacity={isTyping ? 0 : 1}
                          transform={`translate3d(0, ${isTyping ? -10 : 0}, 0)`}
                          lineHeight={1}
                          transition={`opacity 0.3s 0.${
                            i * 3
                          }s ease-in, transform 0.2s 0.${i * 3}s ease-in-out`}
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
                            fontSize="large"
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
                    },
                  )
                ) : (
                  <Box>
                    <Text mb={5}>Tumbleweed rolls by...</Text>
                  </Box>
                )}
              </UnorderedList>
              <Button
                variant="ghost"
                display="inline-block"
                fontWeight="normal"
                transition="all 0.3s ease"
                textShadow={`0 0 8px var(--chakra-colors-landing500)`}
                borderBottom="2px solid var(--chakra-colors-landing550)"
                _hover={{
                  backgroundColor: 'transparent',
                  color: 'var(--chakra-colors-landing500)',
                  borderBottom: '2px solid var(--chakra-colors-landing500)',
                }}
                borderRadius="inherit inherit 0 0"
                wordBreak="break-word"
                px={0}
                textAlign="left"
                fontSize="large"
                onClick={handleReset}
              >
                Start again
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <BoxedNextImage
          src={octoImg}
          animation={pulseAnimation}
          position="relative"
          width="50%"
          maxW="lg"
          height="33%"
        />
      )}
    </Box>
  );
};

export interface GameData {
  data: string;
}
