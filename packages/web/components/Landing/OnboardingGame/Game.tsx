import {
  Box,
  Button,
  keyframes,
  ListItem,
  Text,
  UnorderedList,
} from '@metafam/ds';
import externalLinkIcon from 'assets/landing/external-link-icon.png';
import { CONFIG } from 'config';
import { useGame } from 'contexts/GameContext';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { MdRestartAlt } from 'react-icons/md';
import {
  safelyParseContent,
  safelyParseTextForTyping,
} from 'utils/stringHelpers';

import type {
  GameProperties,
  GamePropertiesType,
  IConnection,
  // IConnectionsObject,
  IElement,
  IJumper,
  // IJumpersObject,
} from './gameTypes';

export type CurrentElementState = IElement & {
  elementId: string;
};
export type ConnectionStateItem = IConnection & {
  connectionId: string;
};

export type CurrentJumperState = IJumper & {
  jumperId: string;
};

export const OnboardingGame: React.FC = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  // const scrollerRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { gameState, handleChoice, resetGame } = useGame();
  const [currentElement, setCurrentElement] = useState<CurrentElementState>();
  const [currentConnections, setCurrentConnections] =
    useState<ConnectionStateItem[]>();
  const [currentJumpers, setCurrentJumpers] = useState<CurrentJumperState[]>();
  const [currentDialogue, setCurrentDialogue] =
    useState<CurrentSectionDialogueChoices['currentDialogue']>();
  const [currentChoices, setCurrentChoices] =
    useState<CurrentSectionDialogueChoices['currentChoices']>();
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [hasError, setHasError] = useState(false);
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
  // const pulseAnimation = `${blink} 2s infinite`;

  /** Function to async fetch `CONFIG.onboardingGameDataURL` as json and return the data */
  const fetchGameData = useCallback(async () => {
    try {
      setHasError(false);
      // setIsLoading(true);
      console.log('fetchGameData...');

      const response = await fetch(CONFIG.onboardingGameDataURL);
      console.log('fetchGameData RES', response.status);
      const data = (await response.json()) as GameProperties;
      console.log('fetchGameData', data);
      const {
        assets,
        name,
        startingElement,
        elements,
        connections,
        jumpers,
        attributes,
        components,
      } = data;
      return {
        name,
        assets,
        startingElement,
        elements,
        connections,
        jumpers,
        attributes,
        components,
      } as GameProperties;
    } catch (error) {
      console.log('fetch error: ', { error });
      setHasError(true);
      return {
        name: '',
        assets: {},
        startingElement: '',
        elements: {},
        connections: {},
        jumpers: {},
        attributes: {},
        components: {},
      } as GameProperties;
    }
  }, []);

  /** Sets the starting point for the game (startingElement or saved state) */
  const initGame = () => {
    setIsLoading(true);

    fetchGameData()
      .then((data) => {
        if (data.name.length > 0) {
          setGameDataState(data);

          console.log('fetched data', data);

          const state = gameState();

          const element =
            state !== null
              ? data.elements[state]
              : data.elements[data.startingElement];

          // console.log('gameDataState', data);
          const elementData: CurrentElementState = {
            ...element,
            elementId: state ?? data.startingElement,
          };
          console.log('elementData', elementData);

          setCurrentElement(elementData);
          console.log('currentElement set', currentElement);

          return elementData;
        }
        throw new Error('No game data found');
      })
      .then((data) => {
        if (data) {
          console.log('data', data);

          makeCurrentSectionDialogue(data);
          console.log('section data', { currentElement, data });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log('initGame error: ', { error });
        setIsLoading(false);
      })
      .finally(() => {});
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

        console.log('got connections', { connectionIds, elementConnections });

        setCurrentConnections(elementConnections);
        return elementConnections;
      }

      throw new Error('No connections found');
    } catch (error) {
      setCurrentConnections([]);
      // console.log('getConnections ', { error });
      return undefined;
    }
  };

  /** Get the jumpers, if any, for the current element */
  const getJumpers = (jumperIds: string[]) => {
    try {
      if (jumperIds.length > 0) {
        // console.log('getJumpers', { jumperIds });

        const elementJumpers = jumperIds.map((id: string) => {
          console.log('elementJumpers', { id });

          const jumperData = {
            ...gameDataState?.jumpers[id],
            jumperId: id,
            // elementId: jumpers[id].elementId,
          };
          console.log('jumperData', jumperData);

          return jumperData;
        });

        // console.log('getJumpers returns', { elementJumpers });

        setCurrentJumpers(elementJumpers);
        console.log('set jumpers', { elementJumpers });

        return elementJumpers;
      }
      throw new Error('No jumpers found');
    } catch (error) {
      // console.log('getJumpers ', { error });
      return undefined;
    }
  };

  /** Welcome back for returning players */
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

  /** Call the init() function on mount */
  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Call to get connections when the currentElement changes */
  useEffect(() => {
    if (currentElement !== undefined && currentElement.outputs !== null) {
      // setCurrentConnections([])
      getConnections(currentElement.outputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

  /** Call to get jumpers when the currentConnections change */
  useEffect(() => {
    if (currentConnections !== undefined && currentConnections.length > 0) {
      // setCurrentJumpers([])

      console.log('jumpers uef: Current connections', currentConnections);

      const jumpers: any[] = currentConnections.filter(
        (
          connection: ConnectionStateItem,
        ): IConnection['targetid'] | undefined => {
          if (connection.targetType === 'jumpers') {
            // console.log('We found a jumper', connection);
            return connection.targetid;
          }
          return undefined;
        },
      );
      if (jumpers !== undefined && jumpers.length > 0) {
        console.log('Mapping jumpers...', jumpers);

        const jumperIds = jumpers.map((jumper: IConnection) => jumper.targetid);
        console.log('jumperIds', jumperIds);
        getJumpers(jumperIds);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConnections]);

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
    const { content, title } = section;
    const string = `${title ? '<p></p>' : '<p></p>'}${content ?? '<p></p>'}`;
    const parsedContent: any = safelyParseTextForTyping(string);
    const dialogue: any[] = [];
    const choices: any[] = [];
    try {
      /**
       * if it is set, take the parsedContent, find & push paragraphs that contain *no* links as child elements
       * into the `dialogue` array.
       * if the paragraph has a link, push it into the `choices` array.
       */
      if (parsedContent.length > 0) {
        console.log('parsedContent', parsedContent);
        parsedContent.forEach((paragraph: JSX.Element) => {
          const { children } = paragraph.props;
          if (children) {
            const hasLink = children.type === 'a';
            if (!hasLink) {
              // console.log('no link', paragraph);
              dialogue.push(paragraph);
            } else {
              // console.log('has link', children);
              choices.push(children);
            }
          }
          return paragraph;
        });
        setCurrentDialogue(dialogue);
        setCurrentChoices(choices);
        console.log('makeCurrentSectionDialogue', { dialogue, choices });
        return {
          currentDialogue: dialogue,
          currentChoices: choices,
        };
      }
      if (dialogue.length === 0 && choices.length === 0) {
        throw new Error('No dialogue or choices found');
      }

      return {
        currentDialogue: [],
        currentChoices: [],
      };
    } catch (error) {
      console.log('makeCurrentSectionDialogue error', { error });
      return {
        currentDialogue: [],
        currentChoices: [],
      };
    }
  };

  /** Handles the typing effect.
   * TODO: probs should be extracted to a separate component/function
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && currentDialogue !== undefined) {
      // makeCurrentSectionDialogue(currentElement);
      setIsTyping(true);
      const elementsToType = document.querySelectorAll('.typing-text');
      const phrases: string[] = [];
      const links: Element[] = [];
      for (let a = 0; a < elementsToType.length; a++) {
        if (elementsToType[a].textContent !== null) {
          if (elementsToType[a].children.length > 0) {
            for (let b = 0; b < elementsToType[a].children.length; b++) {
              if (elementsToType[a].children[b].hasAttribute('href')) {
                links.push(elementsToType[a].children[b]);
              }
            }
          }
          phrases.push(elementsToType[a].textContent as string);
        }
      }

      let i = 0;
      let j = 0;
      let currentPhrase: string[] = [];
      let hasEnded = false;
      const loop = () => {
        if (i < elementsToType.length) {
          if (j <= phrases[i].length) {
            elementsToType[i].classList.remove('typed');
            elementsToType[i].classList.add('typing');

            currentPhrase.push(phrases[i][j]);

            elementsToType[i].textContent = currentPhrase.join('');
            elementsToType[i].appendChild(document.createElement('span'));
            j++;
          }

          if (j === phrases[i].length) {
            if (i < elementsToType.length - 1) {
              elementsToType[i].classList.remove('typing');
              elementsToType[i].classList.add('typed');
            }

            if (links.length > 0) {
              // for every link, find the matching text in elementsToType[i] and replace it with the anchor tag
              for (let k = 0; k < links.length; k++) {
                const link = links[k];
                const element = elementsToType[i];
                const linkText = link.textContent;
                const textToFind = linkText ?? '';
                element.innerHTML = element.innerHTML.replace(
                  textToFind,
                  link.outerHTML,
                );
              }
            }
            currentPhrase = [];
            j = 0;
            i++;
          }
          if (i === phrases.length) {
            hasEnded = true;
            console.log('hasEnded', hasEnded);

            setIsTyping(false);
          }
        }

        const randomiseSpeed = Math.random() * (40 - 2) + 2;
        setTimeout(loop, randomiseSpeed);
      };
      loop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentElement]);

  const handleProgress = (elementId: string) => {
    setIsLoading(true);
    handleChoice(elementId)
      .then((data) => {
        const nextElement =
          data !== undefined
            ? { ...gameDataState?.elements[data], elementId: data }
            : undefined;
        if (nextElement !== undefined) {
          // console.log('NewElement', nextElement);

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
      position="relative"
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
      <Box
        ref={ref}
        position="absolute"
        // border="1px solid"
        top="25vh"
        right={0}
        width={1}
        height="50vh"
        pointerEvents="none"
        zIndex={0}
      />
      {!isLoading && gameDataState !== null ? (
        <Box
          position="fixed"
          bottom="18%"
          flexDirection="column"
          justifyContent="flex-start"
          color="var(--chakra-colors-landing550)"
          textShadow={`0 0 10px var(--chakra-colors-landing500)`}
          maxW="4xl"
          height="100vh"
          maxH="66vh"
          overflowY="auto"
          width="100%"
          // border="1px solid var(--chakra-colors-landing550)"
          fontSize={{ base: '1.5rem', md: '5xl', xl: '4xl', '2xl': '3rem' }}
          lineHeight={{
            base: '2.25rem',
            md: '2rem',
            xl: '2rem',
            '2xl': '4rem',
          }}
          pl={{ base: 0, md: 0 }}
          py={{ base: 10, md: 10 }}
          zIndex={onScreen ? 0 : -20}
          transform={`translate3d(0, ${'0'}, 0)`}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          {/* <Box ref={scrollerRef} position="relative" width="100%" overflowY="visible"> */}
          {/* {currentElement !== undefined ? ( */}
          <Box
            ref={scrollContentRef}
            className="step"
            // height="auto" minH="fit-content" width="full" opacity={onScreen ? 1 : 0} zIndex={onScreen ? 0 : -20} position="absolute" bottom="0"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            flexGrow={1}
            height="full"
            opacity={onScreen ? 1 : 0}
            transition="opacity 0.5s 0.2s ease-in"
            sx={{
              a: {
                position: 'relative',
                display: 'inline-flex',
                lineHeight: '1.7rem',
                color: 'var(--chakra-colors-landing550)',
                borderBottom: '2px solid var(--chakra-colors-landing550)',
                '&::after': {
                  content: '" "',
                  display: 'inline-block',
                  mx: 1,
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundImage: `url(${externalLinkIcon})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter:
                    'drop-shadow(0 0 0.5rem var(--chakra-colors-landing500))',
                },
              },
            }}
          >
            <Box
              className="question"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                justifySelf: 'flex-start',
                // border: '1px solid var(--chakra-colors-landing550)',
                lineHeight: 1,
                mb: 2,
                p: {
                  fontSize: 'large',
                  lineHeight: '1.7rem',
                  marginBottom: '1rem',
                },
                blockquote: {
                  position: 'relative',
                  fontSize: 'large',
                  lineHeight: '1.7rem',
                  marginBottom: '1rem',
                  pl: 10,
                  // borderLeft: '5px solid var(--chakra-colors-landing550)',
                  '&::before': {
                    content: '"\u275D"',
                    display: 'block',
                    position: 'absolute',
                    top: 3,
                    left: 2,
                    fontSize: '6xl',
                  },
                },
                a: {
                  '&::after': {
                    content: '" "',
                    right: -10,
                  },
                },
                '.typing-text': {
                  '&.typed': {
                    display: 'block',
                  },
                  display: 'none',
                  '&.typing': {
                    display: 'block',
                    span: {
                      display: 'inline-block',
                      right: 0,
                      bottom: 0,
                      transform: 'translate3d(0, 1px, 0)',
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
                fontSize="2xl"
                width="100%"
                visibility={welcomeBack ? 'visible' : 'hidden'}
                aria-hidden={welcomeBack ? 'false' : 'true'}
                height={welcomeBack ? 'auto' : '0'}
                mb={welcomeBack ? 6 : 0}
                textAlign="left"
              >
                Welcome back Anon!
              </Box>
              {/* {currentElement?.elementId && <p>Current element { currentElement.elementId}</p>} */}
              {currentElement &&
                currentDialogue !== undefined &&
                currentDialogue.map((dialogue) => dialogue)}
            </Box>
            <Box
              className="responses"
              fontSize="large"
              justifySelf="flex-end"
              flexGrow={0}
              width="full"
              flexShrink={0}
              lineHeight={1}
              sx={{
                p: {
                  fontSize: 'large',
                  lineHeight: '1.7rem',
                  marginBottom: '1rem',
                },
              }}
            >
              <UnorderedList
                listStyleType="none"
                display="flex"
                flexFlow="column wrap"
                alignItems="flex-start"
                width="full"
                ml={0}
                opacity={isTyping ? 0 : 1}
                height={isTyping ? '0' : 'auto'}
                overflowX="hidden"
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
                      const { label, targetid } =
                        connection as ConnectionStateItem;
                      const btnText = safelyParseContent(label) as ReactElement;

                      const target = () => {
                        if (currentJumpers && currentJumpers.length > 0) {
                          for (let j = 0; j < currentJumpers.length; j++) {
                            if (currentJumpers[j].jumperId === targetid) {
                              return currentJumpers[j].elementId;
                            }
                          }
                        }
                        return targetid;
                      };
                      const targetId = target();

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
                            onClick={() => handleProgress(targetId)}
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
                            width={'auto'}
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
                          {/* {connection.targetType === 'jumpers' ? <Box as="p"
                            sx={{
                            fontSize: 'sm',
                            color: 'cyan',
                            }}>Jumper: {connection.targetid} <br />
                            ConnectionId: {connection.connectionId} <br />
                            Target Element: {targetId}</Box> : <Box as="p"
                            sx={{
                            fontSize: 'sm',
                            color: 'white',
                            }}>ConnectionId: {connection.connectionId} <br />
                            Target Element: {targetId}</Box>} */}
                        </ListItem>
                      );
                    },
                  )
                ) : (
                  <Box>
                    <Text mb={5}>The End...</Text>
                  </Box>
                )}
              </UnorderedList>
              <Button
                position="fixed"
                bottom={10}
                right={0}
                variant="ghost"
                display="inline-flex"
                alignItems={'center'}
                fontWeight="normal"
                transition="all 0.3s ease"
                textShadow={`0 0 8px var(--chakra-colors-landing400)`}
                border="2px solid transparent"
                color={'var(--chakra-colors-landing350)'}
                _hover={{
                  backgroundColor: 'transparent',
                  color: 'var(--chakra-colors-landing300)',
                  // border: '2px solid var(--chakra-colors-landing300)',
                  svg: {
                    filter:
                      'drop-shadow(0 0 10px var(--chakra-colors-landing300))',
                  },
                }}
                borderRadius="inherit inherit 0 0"
                wordBreak="break-word"
                px={3}
                textAlign="left"
                fontSize="large"
                onClick={handleReset}
              >
                <MdRestartAlt
                  size="lg"
                  filter="drop-shadow(0 0 10px var(--chakra-colors-diamond)"
                />
                {/* Reboot system */}
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          position="relative"
          display="flex"
          flexFlow="column wrap"
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          textAlign="center"
        >
          <Box
            as="p"
            fontSize="xl"
            mt={6}
            color="var(--chakra-colors-landing550)"
            textShadow={`0 0 8px var(--chakra-colors-landing500)`}
          >
            {hasError
              ? 'Fatal exception. System shutting down...'
              : 'Incoming communication...'}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export interface GameData {
  data: string;
}
