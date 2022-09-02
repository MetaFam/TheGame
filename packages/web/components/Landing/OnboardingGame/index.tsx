/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Icon,
  keyframes,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  usePrefersReducedMotion,
} from '@metafam/ds';
import externalLinkIcon from 'assets/landing/external-link-icon.png';
import { useGame } from 'contexts/GameContext';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { get } from 'lib/store';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { MdDownloading, MdRestartAlt, MdWarning } from 'react-icons/md';
import {
  safelyParseContent,
  safelyParseTextForTyping,
} from 'utils/stringHelpers';

import { Chiev } from './Chiev';
import type {
  GameProperties,
  GamePropertiesType,
  IConnection,
  IElement,
  IJumper,
} from './gameTypes';
import gameJson from './metagame-onboarding-game.json';

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
  const noMotion = usePrefersReducedMotion();
  const onScreen = useOnScreen(ref);
  const { gameState, handleChoice, resetGame, visitedElements } = useGame();
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
  const visits = visitedElements();
  const [chievFound, setChievFound] = useState(false);

  /** Function to async fetch `CONFIG.onboardingGameDataURL` as json and return the data */
  const fetchGameData = useCallback(async () => {
    try {
      setHasError(false);

      // const response = await fetch(CONFIG.onboardingGameDataURL);
      // console.log('fetchGameData RES', response.status);
      const data = gameJson as GameProperties;
      // console.log('fetchGameData', data);
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
          const state = gameState();
          const element =
            state !== null
              ? data.elements[state]
              : data.elements[data.startingElement];

          const elementData: CurrentElementState = {
            ...element,
            elementId: state ?? data.startingElement,
          };

          setCurrentElement(elementData);
          const visited = parseInt(visits, 10);
          if (visited === 0 || visited === null) {
            visitedElements(true);
          }
          return elementData;
        }
        throw new Error('No game data found');
      })
      .then((data) => {
        if (data) {
          makeCurrentSectionDialogue(data);
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
      setChievFound(false);
    }
  };

  const triggerChiev = useCallback(() => {
    setChievFound(true);
  }, []);

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
        const elementJumpers = jumperIds.map((id: string) => {
          const jumperData = {
            ...gameDataState?.jumpers[id],
            jumperId: id,
          };

          return jumperData;
        });

        setCurrentJumpers(elementJumpers);

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
      getConnections(currentElement.outputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

  /** Call to get jumpers when the currentConnections change */
  useEffect(() => {
    if (currentConnections !== undefined && currentConnections.length > 0) {
      const jumpers: any[] = currentConnections.filter(
        (
          connection: ConnectionStateItem,
        ): IConnection['targetid'] | undefined => {
          if (connection.targetType === 'jumpers') {
            return connection.targetid;
          }
          return undefined;
        },
      );
      if (jumpers !== undefined && jumpers.length > 0) {
        const jumperIds = jumpers.map((jumper: IConnection) => jumper.targetid);
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
          return paragraph;
        });
        setCurrentDialogue(dialogue);
        setCurrentChoices(choices);
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
        const speedMax = 10;
        const speedMin = 1;
        const randomiseSpeed = Math.random() * (speedMax - speedMin) + speedMin;
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
          visitedElements(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('handleProgress error: ', { err });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const number = parseInt(visits, 10);
    const triggerOn = 20;
    const triggerElements = ['1357573e-5f79-420e-9e61-6da47f341546'];
    const currentElementId: string = currentElement?.elementId ?? '';
    const claimed = get('ChievClaimed');
    if (
      (number === triggerOn ||
        (currentElementId &&
          triggerElements.find((el) => el === currentElementId))) &&
      claimed !== 'true'
    ) {
      // eslint-disable-next-line no-alert
      triggerChiev();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

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
      {/* this enables finer control of when `'onScreen` is updated */}
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
        <>
          <Box
            position="absolute"
            bottom="18%"
            flexDirection="column"
            justifyContent="flex-start"
            color="var(--chakra-colors-landing550)"
            textShadow={`0 0 10px var(--chakra-colors-landing500)`}
            maxW={{ base: 'full', md: '4xl' }}
            height="100vh"
            maxH="66vh"
            overflowY="auto"
            width={{ base: '90%', xl: '100%' }}
            pl={{ base: 0, md: 10, xl: 0 }}
            pr={{ base: 2, md: 10, xl: 0 }}
            pb={{ base: 5, xl: 10 }}
            zIndex={onScreen ? 0 : noMotion ? 0 : -20}
            transform={`translate3d(0, ${'0'}, 0)`}
            transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
          >
            <Box
              ref={scrollContentRef}
              className="step"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              flexGrow={1}
              height="full"
              opacity={onScreen ? 1 : noMotion ? 1 : 0}
              transition="opacity 0.5s 0.2s ease-in"
              sx={{
                a: {
                  position: 'relative',
                  display: 'inline',
                  lineHeight: { base: '1.2rem', xl: '1.7rem' },
                  color: 'var(--chakra-colors-landing550)',
                  // borderBottom: '2px solid var(--chakra-colors-landing550)',
                  textDecoration: 'underline',
                  pr: { base: 1, md: 0 },
                  '&:hover': {
                    color: 'var(--chakra-colors-landing500)',
                    // borderBottom: '2px solid var(--chakra-colors-landing500)',
                  },
                  '&::after': {
                    content: '" "',
                    display: 'inline-flex',
                    p: { base: 1, md: 0 },
                    ml: 1,
                    width: { base: '0.6rem' },
                    height: { base: '0.6rem' },
                    backgroundImage: `url(${externalLinkIcon})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundPosition: 'center',
                    filter:
                      'drop-shadow(0 0 0.5rem var(--chakra-colors-landing500))',
                  },
                },
                button: {
                  _focus: {
                    background: 'transparent',
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
                  lineHeight: { base: '1.2rem', '2xl': '1.7rem' },
                  mb: 2,
                  p: {
                    display: 'block',
                    fontSize: { base: 'sm', md: 'sm', '2xl': 'lg' },
                    marginBottom: { base: 2, '2xl': 5 },
                  },
                  blockquote: {
                    position: 'relative',
                    fontSize: { base: 'sm', md: 'sm', '2xl': 'lg' },
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
                        height: { base: '0.7rem', '2xl': '1rem' },
                        width: 0,
                        borderLeft: '2px solid var(--chakra-colors-landing550)',
                        filter:
                          'drop-shadow(0 0 0.5rem var(--chakra-colors-landing500))',
                        animation: noMotion ? 'none' : typingAnimation,
                      },
                    },
                  },
                }}
              >
                <Box
                  opacity={welcomeBack ? 1 : 0}
                  transition="all 0.3s ease"
                  fontSize={{ base: 'lg', '2xl': '2xl' }}
                  width="100%"
                  visibility={welcomeBack ? 'visible' : 'hidden'}
                  aria-hidden={welcomeBack ? 'false' : 'true'}
                  height={welcomeBack ? 'auto' : '0'}
                  mb={welcomeBack ? 6 : 0}
                  textAlign="left"
                >
                  <span>Welcome back Anon!</span>
                </Box>
                {/* {currentElement?.elementId && <Box as="p" fontSize="sm">Current element { currentElement.elementId}</Box>} */}
                {currentElement &&
                  currentDialogue !== undefined &&
                  currentDialogue.map((dialogue) => dialogue)}
              </Box>
              <Box
                className="responses"
                fontSize={{ base: 'sm', md: 'sm', '2xl': 'lg' }}
                justifySelf="flex-end"
                flexGrow={0}
                width="full"
                flexShrink={0}
                lineHeight={1}
                sx={{
                  p: {
                    fontSize: { base: 'sm', md: 'sm', '2xl': 'lg' },
                    marginBottom: { base: 2, '2xl': 5 },
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
                        transform={
                          noMotion
                            ? 'none'
                            : `translate3d(0, ${isTyping ? -10 : 0}, 0)`
                        }
                        lineHeight={1}
                        transition={
                          noMotion
                            ? 'none'
                            : `opacity 0.3s 0.${
                                i * 3
                              }s ease-in, transform 0.2s 0.${
                                i * 3
                              }s ease-in-out`
                        }
                      >
                        {choice}
                      </ListItem>
                    ))}
                  {currentConnections && currentConnections.length > 0 ? (
                    currentConnections.map(
                      (connection: ConnectionStateItem, i: number) => {
                        const { label, targetid } =
                          connection as ConnectionStateItem;
                        const btnText = safelyParseContent(
                          label,
                        ) as ReactElement;

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
                            mb={{ base: 1, md: 2, '2xl': 3 }}
                            opacity={isTyping ? 0 : 1}
                            transform={
                              noMotion
                                ? 'none'
                                : `translate3d(0, ${isTyping ? -10 : 0}, 0)`
                            }
                            transition={
                              noMotion
                                ? 'none'
                                : `opacity 0.3s 0.${
                                    i * 3
                                  }s ease-in, transform 0.2s 0.${
                                    i * 3
                                  }s ease-in-out`
                            }
                          >
                            <Button
                              onClick={() => handleProgress(targetId)}
                              variant="ghost"
                              px={0}
                              py={0}
                              display="inline-block"
                              fontWeight="normal"
                              textShadow={`0 0 8px var(--chakra-colors-landing500)`}
                              // borderBottom="2px solid var(--chakra-colors-landing550)"
                              textDecoration="underline"
                              borderRadius="inherit inherit 0 0"
                              wordBreak="break-word"
                              whiteSpace="pre-wrap"
                              textAlign="left"
                              width={'auto'}
                              _hover={{
                                backgroundColor: 'transparent',
                                color: 'var(--chakra-colors-landing500)',
                                // borderBottom:
                                //   '2px solid var(--chakra-colors-landing500)',
                              }}
                              fontSize={{ base: 'sm', md: 'sm', '2xl': 'lg' }}
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
              </Box>
            </Box>
          </Box>
          <Tooltip label="Reset system" hasArrow placement="bottom">
            <Button
              position="absolute"
              aria-label="reset system"
              bottom={{ base: 20, md: '22%' }}
              left={{ base: '45%', md: 'auto' }}
              right={{ base: '45%', md: 9 }}
              variant="ghost"
              display="inline-flex"
              alignItems={'center'}
              fontWeight="normal"
              transition="all 0.3s ease"
              textShadow={`0 0 8px var(--chakra-colors-landing400)`}
              border="2px solid transparent"
              color={'var(--chakra-colors-diamond)'}
              borderRadius="inherit inherit 0 0"
              wordBreak="break-word"
              px={3}
              opacity={0.5}
              textAlign="left"
              onClick={handleReset}
              sx={{
                svg: {
                  filter: 'drop-shadow(0 0 10px var(--chakra-colors-diamond))',
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'var(--chakra-colors-landing300)',
                  opacity: 1,
                  svg: {
                    filter:
                      'drop-shadow(0 0 10px var(--chakra-colors-landing300))',
                  },
                },
              }}
            >
              <Icon
                as={MdRestartAlt}
                w={{ base: 8, xl: 10 }}
                h={{ base: 8, xl: 10 }}
              />
              {/* Reboot system */}
            </Button>
          </Tooltip>
        </>
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
            fontSize={{ base: 'sm', md: 'xl' }}
            mt={6}
            color="var(--chakra-colors-landing550)"
            textShadow={`0 0 8px var(--chakra-colors-landing500)`}
          >
            {hasError ? (
              <Box display="inline-flex" alignItems="center">
                <Icon as={MdWarning} w={10} h={10} mr={3} />{' '}
                <span>Fatal exception. System shutting down&hellip;</span>
              </Box>
            ) : (
              <Box display="inline-flex" alignItems="center">
                <Icon as={MdDownloading} w={10} h={10} mr={3} />{' '}
                <span>Incoming communication&hellip;</span>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Chiev won={chievFound} setWon={setChievFound} />
    </Box>
  );
};

export interface GameData {
  data: string;
}
